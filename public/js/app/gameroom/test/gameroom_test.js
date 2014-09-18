'use strict';

describe('gameroom tests', function() {
    var scope, ctrl, location, spy, userMock, socketMock;

    beforeEach(module('myApp'));
    afterEach(function() {
        localStorage.clear();
    });

    describe("GameroomCtrl with a null user ", function() {

        beforeEach(inject(function($injector, $controller, $rootScope, $location, user, socket) {
            scope = $rootScope.$new();
            location = $location;
            userMock = user;
            socketMock = new sockMock($rootScope);

            var params = {
                $scope: scope,
                $location: $location,
                user: user,
                socket: socketMock
            };

            spyOn(userMock, 'get').andReturn(null);
            ctrl = $controller('GameroomCtrl', params);

        }));

        it('should redirect a null user', inject(function($controller) {
            expect(userMock.get()).toEqual(null);
            expect(location.path()).toEqual('/signon');
        }));
    });

    describe('GameroomCtrl controller with user', function() {
        beforeEach(inject(function($injector, $controller, $rootScope, $location, user, socket) {
            scope = $rootScope.$new();
            location = $location;
            userMock = user;
            socketMock = new sockMock($rootScope);

            var params = {
                $scope: scope,
                $location: $location,
                user: user,
                socket: socketMock
            };

            spyOn(userMock, 'get').andReturn('testUser');
            ctrl = $controller('GameroomCtrl', params);

        }));

        it('should set name on initialize', inject(function($controller) {
            spyOn(socketMock, 'emit').andCallThrough();
            ctrl.initialize();
            expect(socketMock.emit).toHaveBeenCalledWith('set:name', {
                name: 'testUser'
            });
            expect(socketMock.emit).toHaveBeenCalledWith('get:question', {});
        }));

        it('should get a question', inject(function($controller) {
            spyOn(ctrl, 'getQuestion').andCallThrough();
            spyOn(socketMock, 'emit').andCallThrough();
            ctrl.getQuestion();
            expect(ctrl.getQuestion).toHaveBeenCalled();
        }));

        it('should not redirect a named user', inject(function($controller) {
            userMock.set('testUser');
            location.path('/gameroom');
            expect(userMock.get()).toEqual('testUser');
            expect(location.path()).toEqual('/gameroom');
        }));

        it('should change questions', inject(function($controller) {
            socketMock.receive('send:question', 'this is the test question?');
            expect(scope.question).toBe('this is the test question?');
            socketMock.receive('send:question', 'this is the 2nd test question?');
            expect(scope.question).toBe('this is the 2nd test question?');
        }));

        it('should send a response to socket to check a correct answer', inject(function($controller) {
            userMock.set('testUser');
            location.path('/gameroom');
            scope.response = 'correct answer';
            spyOn(socketMock, 'emit').andCallThrough();
            scope.submitResponse();
            expect(socketMock.emit).toHaveBeenCalledWith('test:answer', {
                user: 'testUser',
                answer: 'correct answer'
            }, jasmine.any(Function));
            expect(scope.response).toEqual('');
        }));

        it('should have a flash message', function(done){
            userMock.set('testUser');
            location.path('/gameroom');
            ctrl.flashMessage('test messsage');
            expect(scope.alert).toEqual('test messsage');
            setTimeout(function(){
                expect(scope.alert).toEqual('');
                done();
            }, 4000);

        });
    });
});