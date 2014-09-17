'use strict';

process.env.NODE_ENV = 'test';
var app = require('../../server'),
    chai = require('chai'),
    expect = chai.expect, // jshint ignore:line
    Browser = require('zombie');

describe('signon page', function() {
    before(function() {
        this.server = require('http').Server(app);
        this.browser = new Browser({
            site: 'http://localhost:3000'
        });
    });

    before(function(done) {
        this.browser.visit('/', done);
    });

    it('should visit the main page and fail signin', function(done) {
        var self = this;
        expect(this.browser.window.location.hash).to.equal('#/signon');

        this.browser.pressButton("submit", function() {
            expect(self.browser.window.location.hash).to.equal('#/signon');
            done();
        });

    });

    it('should visit the main page and pass signin', function(done) {
        var self = this;
        expect(this.browser.window.location.hash).to.equal('#/signon');

        this.browser.fill("login", "testName").pressButton("submit", function() {
            expect(self.browser.window.location.hash).to.equal('#/gameroom');
            done();
        });

    });

});