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
                        $scope.alert = status['Winner'];
                    } else {
                        $scope.alert = status['Incorrect'];
                    }

                    $timeout(function() {
                        $scope.alert = false;
                    }, 3000);
                });
            }

            $scope.response = '';
        };
    }
]);