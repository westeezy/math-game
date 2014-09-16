'use strict';

ControllerModule.
controller('SignonCtrl', [
    '$scope',
    '$location',
    'user',
    'socket',
    function($scope, $location, user, socket) {
        var self = this;

        $scope.showError = false;

        $scope.startGame = function() {
            if ($scope.userName && $scope.userName.length > 2) {
                socket.emit('set:name', {
                    name: $scope.userName
                }, function(data) {
                    user.set(data.name);
                    $location.path('/gameroom');
                });
            } else {
                $scope.showError = true;
            }
        };
    }
]);