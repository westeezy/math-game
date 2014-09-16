'use strict';

describe('signon tests', function() {
    var scope, ctrl, location, userMock, socketMock;

    beforeEach(module('myApp'));

    beforeEach(inject(function($injector, $controller, $rootScope, $location, user, socket) {
        scope = $rootScope.$new();
        location = $location;
        userMock = user;
        socketMock = io.connect();

        var params = {
            $scope: scope,
            $location: $location,
            user: user,
            socket: socketMock
        };

        ctrl = $controller('SignonCtrl', params);
    }));

    describe('SignonCtrl controller', function() {

        it('should be a valid controller instance', inject(function($controller) {
            expect(ctrl).toBeDefined();
        }));

        it('should reject an invalid username', inject(function($controller) {
            expect(ctrl).toBeDefined();
            scope.userName = '';
            scope.startGame();

            expect(location.path()).toEqual('');
            expect(scope.showError).toEqual(true);
            expect(userMock.get()).toEqual(null);

            scope.userName = 'ab';
            scope.startGame();

            expect(location.path()).toEqual('');
            expect(scope.showError).toEqual(true);
            expect(userMock.get()).toEqual(null);
        }));

        it('should accept a valid username', inject(function($controller) {
            expect(ctrl).toBeDefined();
            scope.userName = 'test_user';
            io.mockData({
                name: 'test_user'
            });
            scope.startGame();

            expect(location.path()).toEqual('/gameroom');
            expect(userMock.get()).toEqual('test_user');
            expect(userMock.set('test2_user')).toEqual(true);
            expect(userMock.get()).toEqual('test2_user');
        }));

    });
});