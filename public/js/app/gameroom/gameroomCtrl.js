'use strict';

ControllerModule.
controller('GameroomCtrl', [
    '$scope',
    '$location',
    '$timeout',
    'socket',
    'user',
    function($scope, $location, $timeout, socket, user) {
        var self = this,
            currentUser = user.get(),
            status = {
                'Winner': 'Winner',
                'Loser': 'Loser',
                'Incorrect': 'Incorrect'
            };

        this.getQuestion = function getQuestion() {
            socket.emit('get:question', {});
        };

        this.initialize = function initialize() {
            if (!currentUser) {
                $location.path('/signon');
            } else {
                if (user.isSet() === false) {
                    socket.emit('set:name', {
                        name: currentUser
                    });
                }
                this.getQuestion();
            }
        };

        this.flashMessage = function(message){
            $scope.alert = message;
            $timeout(function(){
                $scope.alert = false;
            }, 3000);
        };

        this.initialize();

        socket.on('send:question', function(result) {
            $scope.question = result;
        });

        socket.on('correct:answer', function(result) {
            $scope.question = result;
        });

        $scope.submitResponse = function() {
            if ($scope.response && $scope.response.length > 0) {
                socket.emit('test:answer', {
                    user: user.get(),
                    'answer': $scope.response
                }, function(data) {
                    if (data) {
                        self.flashMessage(status['Winner']);
                    } else {
                        self.flashMessage(status['Incorrect']);
                    }
                });
            }

            $scope.response = '';
        };
    }
]);