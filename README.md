## Sockets Demo[![Build Status](https://travis-ci.org/westeezy/math-game.svg?branch=master)](https://travis-ci.org/westeezy/math-game)

using node, express4, and angular 1.2

## Usage
1. `npm install`
2. `bower install`
3. `npm start`
 
## npm scripts
1. `npm run dev` for nodemon
2. `npm start` for node standard (todo: implement forever, currently nodejitsu takes care of this)
3. `npm test` run travis version of tests

## grunt scripts
1. `grunt test` for jshint -> mochaTest (standard reporter) -> karma (phantomjs with singlerun)
2. `grunt` for jshint -> mochaTest (nyan cat reporter) -> karma (chrome with singlerun - override in gruntfile) -> protractor e2e (chrome)


grunt was used for travis to run as it doesn't default have nyan reporter or chrome installed.
grunt test was for during development. typically I would set singlerun to false to debug karma in Chrome. Also nyan cat for the pick me up during development time.



## Testing
  * karma for front end tests in public/js/app/**/test/*.js using Chrome
  * mocha for backend tests in test/*.js
  * protractor for e2e tests in test/e2e/*.js
  * coverage provided with grunt dev env in /coverage
  * do not run app during karma or protractor tests as they will conflict with the app (sockets)
  
#### Protractor Setup
 install java jdk then -
```
 npm install -g protractor
 ./node_modules/protractor/bin/webdriver-manager update
```
#### Run Developement Env Tests
```
 grunt
```
  * for e2e tests in Chrome


#### Run Travis Env Tests
 ```
grunt test or npm test
  ```
  * karma for front end tests in public/**/test/*.js using PhantomJS
  * mocha for backend tests in test/*.js

## Notes on testing
  * public/js/socket.io/mocket.io.js - created to make testing sockets in karma easier

## Bower
  Components are install in public/js/system and checked into repository
  
## Future TODO's
1. Grunt build for minification of assets (usemin most likely)
2. Find out if forever works with nodejitsu and implement ```./node_modules/.bin/forever -m 5 server.js```

## License
MIT
