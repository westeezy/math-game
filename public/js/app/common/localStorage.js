'use strict';

ServiceModule.provider('localStorageService', function() {

    this.$get = ['$rootScope', '$window', '$document',
        function($rootScope, $window, $document) {
            var self = this;
            var storageType = 'localStorage';
            var webStorage;
            var prefix = '__nodeJS_math__';

            // When Angular's $document is not available
            if (!$document) {
                $document = document;
            } else if ($document[0]) {
                $document = $document[0];
            }

            // Checks the browser to see if local storage is supported
            var browserSupportsLocalStorage = (function() {
                try {
                    var supported = (storageType in $window && $window[storageType] !== null);
                    if (supported) {
                        webStorage = $window[storageType];
                    }
                    return supported;
                } catch (e) {
                    return false;
                }
            }());

            var addToLocalStorage = function(key, value) {
                key = prefix + key;
                if (!browserSupportsLocalStorage) {
                    return false;
                }

                if (typeof value === "undefined") {
                    value = null;
                }

                try {
                    if (angular.isObject(value) || angular.isArray(value)) {
                        value = angular.toJson(value);
                    }
                    if (webStorage) {
                        webStorage.setItem(key, value)
                    };
                } catch (e) {
                    return false;
                }
                return true;
            };

            var getFromLocalStorage = function(key) {
                key = prefix + key;
                if (!browserSupportsLocalStorage) {
                    if (!browserSupportsLocalStorage) {
                        return false;
                    }
                }

                var item = webStorage ? webStorage.getItem(key) : null;

                if (!item || item === 'null') {
                    return null;
                }

                if (item.charAt(0) === "{" || item.charAt(0) === "[") {
                    return angular.fromJson(item);
                }

                return item;
            };

            var removeFromLocalStorage = function(key) {
                key = prefix + key;
                if (!browserSupportsLocalStorage) {
                    return false;
                }

                try {
                    webStorage.removeItem(key);
                } catch (e) {
                    return false;
                }
                return true;
            };

            return {
                isSupported: browserSupportsLocalStorage,
                set: addToLocalStorage,
                get: getFromLocalStorage,
                remove: removeFromLocalStorage
            };
        }
    ];
});