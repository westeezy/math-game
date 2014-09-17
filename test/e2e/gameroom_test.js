'use strict';

process.env.NODE_ENV = 'test';
var app = require('../../server'),
    chai = require('chai'),
    expect = chai.expect, // jshint ignore:line
    Browser = require('zombie');

describe('gameroom page', function() {
    var question, answer, click;

    before(function() {
        this.server = require('http').Server(app);
        this.browser = new Browser({
            site: 'http://localhost:3000'
        });
    });

    before(function(done) {
        var self = this;∂

        this.browser.visit('/', function() {
            self.browser.fill('login', 'testName').pressButton('submit', done);
        });

    });

    beforeEach(function(done) {
        expect(this.browser.window.location.hash).to.equal('#/gameroom');
        question = this.browser.document.querySelector('.the-question').innerHTML.trim();
        answer = eval(question);
        this.browser.wait(done);
    });

    it('should have a valid question on the page', function() {
        expect(question).not.to.be.null;
        expect(question).to.exist;
        expect(question).not.to.be.empty;
    });

    it('should incorrectly answer the question on the page', function() {
        var self = this;
        var s = this.browser.document.querySelector('.send-response');
        this.browser.fill('answer', answer);

        this.browser.fire('.send-response', 'click').then(function() {
            console.log('test');
            var currentQuestion = this.browser.document.querySelector('.the-question').innerHTML.trim();
            expect(question).to.not.equal(currentQuestion);
            done();
        });
    });

    it('should correctly answer the question on the page', function() {
        var self = this;
        var s = this.browser.document.querySelector('.send-response');
        this.browser.fill('answer', answer);

        this.browser.fire('.send-response', 'click').then(function() {
            console.log('test');
            var currentQuestion = this.browser.document.querySelector('.the-question').innerHTML.trim();
            expect(question).to.not.equal(currentQuestion);
            done();
        });
    });

});