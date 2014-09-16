'use strict';

describe('chat controller', function() { 
	var scope, ctrl, location, spy, userMock, socketMock;

	beforeEach(module('myApp'));

	beforeEach(inject(function($injector, $controller, $rootScope, user, socket) {
	    scope = $rootScope.$new();
      userMock = user;
      socketMock = new sockMock($rootScope);

	    var params = {
	        $scope: scope,
          user: userMock,
          socket: socketMock
	    };
      
        scope.users = [{
            name: 'user',
            points: 10
        }, {
            name: 'user2',
            points: 0
        }];

	    ctrl = $controller('ChatCtrl', params);
	}));

  	describe('ChatCtrl controller', function(){
    	it('should be a valid controller instance', inject(function($controller) {
      		expect(ctrl).toBeDefined();
    	}));

      it('should get a list of users', inject(function($controller) {
          socketMock.receive('get:users');
          expect(scope.users).toEqual([ { name : 'user', points : 10 }, { name : 'user2', points : 0 } ]);
      }));

      it('should send a message', inject(function($controller) {
          socketMock.receive('send:message', 'hai users');
          expect(scope.messages).toEqual([ 'hai users' ]);
      }));

      it('should change names', inject(function($controller) {
          userMock.set('user');
          expect(userMock.get()).toBe('user');
          socketMock.receive('change:name', {oldName: 'user' , newName:'test name'});
          expect(scope.messages).toEqual([ { user : 'chatroom', text : 'User user is now known as test name.' } ]);
          expect(userMock.get()).toBe('test name');          
        expect(scope.users).toEqual([{
            name: 'test name',
            points: 10
        }, {
            name: 'user2',
            points: 0
        }]);
    }));

      it('fail on name change with no users', inject(function($controller) {
        scope.users = [];
        socketMock.receive('change:name', {oldName: 'user' , newName:'test name'});
        expect(scope.users).toEqual([]);
      }));

      it('should alert when a user joins', inject(function($controller) {
          socketMock.receive('user:join', {name: 'test name'});
          expect(scope.messages).toEqual([ { user : 'chatroom', text : 'User test name has joined.' } ]);
          expect(userMock.get()).toBe('test name');          
          expect(scope.users).toEqual([ { name : 'user', points : 10 }, { name : 'user2', points : 0 }, { name : 'test name' } ]);
      }));

      it('should alert when a user leaves', inject(function($controller) {
          socketMock.receive('user:left', {name: 'user2'});
          expect(scope.messages).toEqual([ { user : 'chatroom', text : 'User user2 has left.' } ]);
          expect(scope.users).toEqual([ { name : 'user', points : 10 } ]);
      }));

      it('should update on score change', inject(function($controller) {
        socketMock.receive('change:score', {name: 'user2', points: 100});
          expect(scope.users).toEqual([ { name : 'user', points : 10 }, { name : 'user2', points : 100 } ]);
      }));

      it('should should have a change name function on scope', inject(function($controller) {
        spyOn(socketMock, 'emit');
        scope.newName = 'new test name';
        scope.changeName();
        expect(socketMock.emit).toHaveBeenCalledWith('change:name', { name : 'new test name' }, jasmine.any(Function));        
      }));

      it('should send messages', inject(function($controller) {
        spyOn(socketMock, 'emit');
        scope.message = 'this is a test message';
        scope.sendMessage();
        expect(socketMock.emit).toHaveBeenCalledWith('send:message', { message : 'this is a test message' });
        expect(scope.messages).toEqual([ { user : 'test name', text : 'this is a test message' } ]);
        
      }));

  	});
});