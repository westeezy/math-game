'use strict';

describe('app', function() {

    var ptor;

    beforeEach(function() {
        browser.get('http://localhost:3000');
        ptor = protractor.getInstance();
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('such math so wow');
        expect(ptor.getCurrentUrl()).toEqual('http://localhost:3000/#/signon');

        /* Signing in */
        var userNameInput = element(by.model('userName'));
        var startButton = element(by.tagName('button'));
        userNameInput.sendKeys('testName');
        startButton.click();
        expect(ptor.getCurrentUrl()).toEqual('http://localhost:3000/#/gameroom');

        var userPoints = element(by.binding('{{user.points}}')).getText();
        expect(userPoints).toEqual('testName: 0');

        /*Interacting with Chat*/
        var messageInput = element(by.tagName('textarea'));
        var messageSend = element(by.className('send-message'));
        messageInput.sendKeys('Hai');
        messageSend.click();
        var sender = element(by.binding('{{message.user}}')).getText();
        var message = element(by.binding('{{message.text}}')).getText();
        expect(sender).toEqual('testName');
        expect(message).toEqual('Hai');



        /*Interacting with Game*/
        element(by.binding('question')).getText().then(function(question) {
            expect(question).toEqual(jasmine.any(String));

            var answerInput = element(by.model('response'));
            var sendAnswer = element(by.className('send-response'));
            var answer = eval(question); // jshint ignore:line

            answerInput.sendKeys('asdf');
            sendAnswer.click();
            userPoints = element(by.binding('{{user.points}}')).getText();
            expect(userPoints).toEqual('testName: 0');

            answerInput.sendKeys(answer);
            sendAnswer.click();
            userPoints = element(by.binding('{{user.points}}')).getText();
            expect(userPoints).toEqual('testName: 10');
        });

    });
});