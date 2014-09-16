'use strict';

var math = require('../models/math'),
    chai = require('chai'),
    expect = chai.expect; // jshint ignore:line

describe('math', function() {
    var question, answer;
    beforeEach(function() {
        question = math.createQuestion();
        answer = math.currentAnswer();
    });

    it('should create a question and answer and not change them', function() {
        expect(math.createQuestion()).to.deep.equal(question);
        expect(math.currentQuestion()).to.equal(question.question);
        expect(math.currentAnswer()).to.deep.equal(answer);
    });

    it('should create a new question when passed true', function() {
        var newQuestion = math.createQuestion(true);
        var newAnswer = math.currentAnswer();
        expect(question).to.not.equal(newQuestion);
        expect(answer).to.not.equal(newAnswer);
    });

    it('should generate the correct answer for the question', function() {
        var solution = eval(math.currentQuestion()); // jshint ignore:line
        expect(solution).to.equal(answer);
    });

});