'use strict';

ControllerModule.
controller('ChatCtrl', [
    '$scope',
    'user',
    'socket',
    function($scope, user, socket) {

        socket.emit('get:users', {}, function(data) {
            $scope.users = data.usernames;
        });

        socket.on('send:message', function(message) {
            $scope.messages.push(message);
        });

        socket.on('change:name', function(data) {
            changeName(data.oldName, data.newName);
        });

        socket.on('user:join', function(data) {
            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + data.name + ' has joined.'
            });
            $scope.users.push(data);
        });

        socket.on('user:left', function(data) {
            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + data.name + ' has left.'
            });
            var i, user;
            for (i = 0; i < $scope.users.length; i++) {
                user = $scope.users[i];
                if (user.name === data.name) {
                    $scope.users.splice(i, 1);
                    break;
                }
            }
        });


        socket.on('change:score', function(data){
            var user = data.name,
                pts = data.points,
                i, len;

            for (i = 0, len = $scope.users.length; i < len; i++) {
                if ($scope.users[i].name === user) {
                    $scope.users[i].points = pts;
                }
            }


        });

        var changeName = function(oldName, newName) {
            if (!$scope.users) return;
            var i;
            for (i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].name === oldName) {
                    $scope.users[i].name = newName;
                }
            }

            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + oldName + ' is now known as ' + newName + '.'
            });

            user.set(newName);
        };

        /******************
         *    Scope
         *******************/

        $scope.name = user.get();
        $scope.messages = [];

        $scope.changeName = function() {
            socket.emit('change:name', {
                name: $scope.newName
            }, function(result) {
                if (!result) {
                    alert('There was an error changing your name');
                } else {

                    changeName($scope.name, $scope.newName);

                    $scope.name = $scope.newName;
                    $scope.newName = '';
                }
            });
        };

        $scope.sendMessage = function() {
            socket.emit('send:message', {
                message: $scope.message
            });

            $scope.messages.push({
                user: $scope.name,
                text: $scope.message
            });

            $scope.message = '';
        };
    }
]);