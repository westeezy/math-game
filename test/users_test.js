'use strict';

var users = require('../models/users'), // jshint ignore:line
    chai = require('chai'),
    expect = chai.expect; // jshint ignore:line

var getUserFromUsers = function(name, users) {
    var list = users.get(),
        i = 0,
        len = list.length;

    for (i = 0; i < len; i++) {
        if (list[i].name === name)
            return list[i];
    }
    return false;
};

describe('users', function() {

    afterEach(function() {
        var list = users.get(),
            i = 0,
            len = list.length;

        for (i = 0; i < len; i++) {
            users.free(list[i].name);
        }
    });

    it('should allow a user to select a name', function() {
        var claim = users.claim('testName');
        expect(claim).to.equal(true);
    });

    it('should not allow two of the same user name', function() {
        users.claim('testName');
        var claim = users.claim('testName');
        expect(claim).to.equal(false);
        expect(users.get()).to.deep.equal([{
            name: 'testName',
            points: 0
        }]);
    });

    it('should be able to generate a guest name', function() {
        var guest = users.getGuestName();
        var guest2 = users.getGuestName();
        expect(guest).to.equal('Guest ');
        expect(guest2).to.equal('Guest 1');

        guest = users.getGuestName('test ');
        guest2 = users.getGuestName('test ');
        expect(guest).to.equal('test ');
        expect(guest2).to.equal('test 1');
    });

    it('should get a list of multiple users', function() {
        var get = users.get();
        expect(get).to.have.length(0);
        users.claim('testName1');
        users.claim('testName2');
        users.claim('testName3');
        users.claim('testName4');

        get = users.get();
        expect(get).to.have.length(4);
    });

    it('should be able to delete a user', function() {
        users.claim('testName');
        users.free('testName');
        var get = users.get();
        expect(get).to.have.length(0);
        expect(get).to.deep.equal([]);
    });

    it('should be able to add points to a user', function() {
        users.claim('testName');
        var user = getUserFromUsers('testName', users);
        expect(user.points).to.equal(0);
        users.addPoints('testName', 10);
        user = getUserFromUsers('testName', users);
        expect(user.points).to.equal(10);

    });
});