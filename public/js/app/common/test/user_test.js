'use strict';

describe('user tests', function() {
    var user, localStorage;

    beforeEach(module("myApp"));

    beforeEach(inject(function(_user_, _localStorageService_) {
        user = _user_;
        localStorage = _localStorageService_;
    }));

    beforeEach(function() {
        inject(function(_user_, _localStorageService_) {
            user = _user_;
            localStorage = _localStorageService_;
        });
    });

    it('should set a user then get it back', function() {
        var set = user.set('test_user');
        var get = user.get();
        expect(set).toEqual(true);
        expect(get).toEqual('test_user');
        expect(user.isSet()).toEqual(true);
        window.localStorage.clear();
    });

    it('should handle no user', function() {
        window.localStorage.clear();
        var get = user.get();
        expect(get).toEqual(null);
    });
});