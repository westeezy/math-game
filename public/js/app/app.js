'use strict';

/* jshint ignore:start */
var ControllerModule = angular.module('myApp.controllers', []);
var ServiceModule = angular.module('myApp.services', []);
var DirectiveModule = angular.module('myApp.directives', []);

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.controllers',
    'myApp.services',
    'myApp.directives'
]).
config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/gameroom', {
            templateUrl: '/js/app/gameroom/gameroom.html',
            controller: 'GameroomCtrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/signon',
            templateUrl: '/js/app/signon/signon.html',
            controller: 'SignonCtrl'
        });
    }
]);
/* jshint ignore:end */