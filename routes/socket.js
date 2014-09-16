'use strict';

var userNames = require('../models/users'),
    game = require('../models/math');

// export function for listening to the socket
module.exports.listen = function (socket, io) {
  var name = userNames.getGuestName();

  socket.on('set:name', function(data, fn){
    userNames.free(name); //delete the default guest name.
    name = userNames.getGuestName(data.name);
    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
      name: name,
      points: 0
    });

    if(fn){
      fn({name:name});
    }
  });

  socket.on('get:users', function(data, fn){
    fn({usernames: userNames.get()});
  });

  socket.on('get:question', function (data, fn) {
    game.createQuestion();
    socket.emit('send:question', game.currentQuestion());
    if(fn)
      fn(game.currentQuestion());
  });

  socket.on('test:answer', function(data, fn){
    var guess = parseInt(data.answer) || false,
        response ={name: name},
        answer = game.currentAnswer();

    if(guess === answer){
      var pts = userNames.addPoints(data.user, 10);
      socket.broadcast.emit('correct:answer', response);
      io.sockets.emit('change:score', {name: name, points: pts});
      if(fn)
        fn(true);

      game.createQuestion(true);
      io.sockets.emit('send:question', game.currentQuestion());
      
    }else{
      socket.broadcast.emit('incorrect:answer', response);
      if(fn)
        fn(false);
    }
  });

  socket.on('send:message', function (data, fn) {
    var message = {
      user: name,
      text: data.message
    };

    socket.broadcast.emit('send:message', message);
    if(fn)
      fn(message);
  });

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name;
      userNames.free(oldName);

      name = data.name;
      
      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });

      fn(true);
    } else {
      fn(false);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
};
