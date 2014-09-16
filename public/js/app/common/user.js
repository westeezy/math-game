'use strict';

ServiceModule.factory('user', [
    'localStorageService',
    function(localStorageService) {
        var user,
            nowSet = false;
        return {
            set: function(userName) {
                user = userName;
                nowSet = true;
                return localStorageService.set('userName', userName);
            },

            get: function() {
                if (user && user.length) {
                    return user;
                } else {
                    user = localStorageService.get('userName');
                    return user;
                }
            },
            isSet: function() {
                return nowSet;
            }
        };
    }
])