'use strict';

var express = require('express'),
    routes = require('./routes'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    path = require('path'),
    errorHandler = require('errorhandler'),
    favicon = require('serve-favicon'),
    swig = require('swig');

var app = module.exports = express();

// Hook Socket.io into Express
var server = require('http').Server(app);
var io = require('socket.io')(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('html', swig.renderFile);
swig.setDefaults({
    varControls: ['{%=', '%}']
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

if ('development' === app.get('env')) {
    app.use(errorHandler());
}

app.get('*', routes.index);
app.get('/partials/:name', routes.partials);

io.sockets.on('connection', function(socket) {
    socket = require('./routes/socket.js').listen(socket, io);
});

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});