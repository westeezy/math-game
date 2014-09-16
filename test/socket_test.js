'use strict';

var client,
    client2,
    chai = require('chai'),
    expect = chai.expect; // jshint ignore:line

var io = require('socket.io-client');
var socketURL = 'http://localhost:3000';

var options = {
    transports: ['websocket'],
    'force new connection': true
};

var chatUser1 = {
    'name': 'testName'
};
var chatUser2 = {
    'name': 'testName2'
};

var parseAnswer = function(data) {
    return eval(data); //jshint ignore:line
};

describe('socket', function() {


    beforeEach(function(done) {
        client = io.connect(socketURL, options);
        client2 = io.connect(socketURL, options);
        done();
    });

    afterEach(function(done) {
        client.disconnect();
        client2.disconnect();
        done();
    });

    it('should broadcast new user to all users and get a userlist', function(done) {
        var numUsers = 1;

        client.on('user:join', function(user) {
            expect(user.name).to.equal('testName2');
            numUsers++;
            expect(numUsers).to.equal(2);
            client.emit('get:users', {}, function(data) {
                expect(data).to.deep.equal({
                    'usernames': [{
                        'name': 'testName',
                        'points': 0
                    }, {
                        'name': 'testName2',
                        'points': 0
                    }]
                });

                done();
            });
        });

        client.emit('set:name', chatUser1);
        client2.emit('set:name', chatUser2);

    });

    it('should get a question for all users', function(done) {
        var question;

        client.emit('get:question', {}, function(data) {
            question = data;
            client2.emit('get:question', {}, function(data) {
                expect(question).to.equal(data);
                expect(question).to.not.equal(undefined);
                expect(question).to.not.equal(null);
                done();
            });
        });
    });

    it('should test a potential answer for incorrectness', function(done) {
        parseAnswer('123');

        client2.on('incorrect:answer', function(response) {
            expect(response).to.deep.equal({
                name: 'Guest '
            });
            done();
        });

        client.emit('get:question', {}, function(data) {
            client.emit('test:answer', {
                'user': 'Guest ',
                'answer': data
            }, function(data) {
                //incorrect guess by just sending back the question
                expect(data).to.equal(false);
            });
        });
    });

    it('should test a potential answer for correctness', function(done) {
        client2.on('send:question', function(response) {
            expect(response).to.be.a('string');
            done();
        });

        client.emit('get:question', {}, function(data) {
            var answer = parseAnswer(data);
            client.emit('test:answer', {
                'user': 'Guest ',
                'answer': answer
            }, function(data) {
                expect(data).to.equal(true);
            });
        });
    });

    it('should send a message to other clients', function(done) {
        client2.on('send:message', function(data) {
            expect(data).to.deep.equal({
                'user': 'Guest ',
                'text': 'hello client2.'
            });
            done();
        });

        client.emit('send:message', {
            'message': 'hello client2.'
        });
    });

    it('should send a change name to other clients', function(done) {
        client2.on('change:name', function(data) {
            expect(data).to.deep.equal({
                'oldName': 'Guest ',
                'newName': 'testName'
            });
            done();
        });

        client.emit('change:name', {
            'name': 'testName'
        }, function(data) {
            expect(data).to.equal(true);
        });
    });

});