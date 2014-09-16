'use strict';

describe('localStorage tests', function() {
    var localStorageService, windowMock;

    beforeEach(module("myApp"));

    beforeEach(function() {
        inject(function(_localStorageService_, $window) {
            localStorageService = _localStorageService_;
            windowMock = $window;
        });
    });

    it('add a key to local storage using the prefix', function() {
        var set = localStorageService.set('test_key', 'success');
        var get = localStorageService.get('test_key');

        expect(localStorage.hasOwnProperty('__nodeJS_math__test_key')).toBe(true);
        expect(set).toBe(true);
        expect(get).toBe('success');
    });

    it('removes a key from local storage', function() {
        localStorageService.set('test key', 'success');
        localStorageService.remove('test_key');
        var get = localStorageService.get('test_key');
        expect(get).toBe(null);
    });

    it('accepts an undefined value', function() {
        var set = localStorageService.set(undefined, undefined);
        expect(set).toBe(true);
    });

    it('accepts a complex value', function() {
        var set = localStorageService.set('key', {
            'test': 1
        });
        expect(set).toBe(true);
    });

    it('accepts an array', function() {
        var set = localStorageService.set('key', ['test', 'test2']);
        expect(set).toBe(true);
    });

    it('can handle removing a null item', function() {
        var remove = localStorageService.remove('asdf1234');
        expect(remove).toBe(true);
    });

    it('add a key to local storage using the prefix', function() {
        var set = localStorageService.set('test_key', 'success');
        var get = localStorageService.get('test_key');

        expect(localStorage.hasOwnProperty('__nodeJS_math__test_key')).toBe(true);
        expect(set).toBe(true);
        expect(get).toBe('success');
    });

    it('removes a key from local storage', function() {
        localStorageService.set('test key', 'success');
        localStorageService.remove('test_key');
        var get = localStorageService.get('test_key');
        expect(get).toBe(null);
    });

});