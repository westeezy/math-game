## Sockets Demo[![Build Status](https://travis-ci.org/westeezy/math-game.svg?branch=master)](https://travis-ci.org/westeezy/math-game)

using node, express4, and angular 1.2

## Usage
1. `npm install`
2. `bower install`
3. `npm start`

## Testing Developement
 ```
grunt
  ```
  * karma for front end tests in public/**/test/*.js using Chrome
  * mocha for backend tests in test/*.js
  * protractor for e2e tests in test/e2e/*.js


## Testing Travis
 ```
grunt test or npm test
  ```
  * karma for front end tests in public/**/test/*.js using PhantomJS
  * mocha for backend tests in test/*.js

## Notes on testing
  * public/js/socket.io/mocket.io.js - created to make testing sockets in karma easier

## Bower
  Components are install in public/js/system and checked into repository

## License
MIT
