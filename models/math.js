'use strict';

var mathGame = (function() {

    var operators = ['+', '-', '*'],
        currentQuestion,
        currentAnswer;


    var getOperator = function() {
        return operators[Math.floor(Math.random() * operators.length)];
    };

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var createQuestion = function(forceNew) {
        if (!currentQuestion || forceNew) {
            var a = getRandomInt(0, 100),
                b = getRandomInt(0, 100),
                operator = getOperator();

            currentAnswer = eval(a + operator + b); // jshint ignore:line
            currentQuestion = a + operator + b;

            //eval is not cool. in prod should use something akin to math.js
            // http://mathjs.org/
        }

        return {
            question: currentQuestion
        };
    };

    var getQuestion = function() {
        return currentQuestion;
    };

    var getAnswer = function() {
        return currentAnswer;
    };

    return {
        createQuestion: createQuestion,
        question: getQuestion,
        answer: getAnswer
    };
})();



module.exports = {
    createQuestion: mathGame.createQuestion,
    currentQuestion: mathGame.question,
    currentAnswer: mathGame.answer
};