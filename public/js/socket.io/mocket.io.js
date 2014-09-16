var io = {
    connect: createMockSocketObject,
    data: {},
    mockData: function(data) {
        this.data = data;
    }
};

var isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

function createMockSocketObject() {

    var socket = {
        on: function(ev, fn) {
            (this._listeners[ev] = this._listeners[ev] || []).push(fn);
        },
        once: function(ev, fn) {
            (this._listeners[ev] = this._listeners[ev] || []).push(fn);
            fn._once = true;
        },
        emit: function(ev, data, callback) {
            if (this._listeners[ev]) {
                this._listeners[ev].forEach(function(listener) {
                    if (listener._once) {
                        this.removeListener(ev, listener);
                    }
                    listener(data);
                }.bind(this));
            }
            callback(io.data);
        },
        _listeners: {},
        removeListener: function(ev, fn) {
            if (fn) {
                var index = this._listeners[ev].indexOf(fn);
                if (index > -1) {
                    this._listeners[ev].splice(index, 1);
                }
            } else {
                delete this._listeners[ev];
            }
        },
        removeAllListeners: function(ev) {
            if (ev) {
                delete this._listeners[ev];
            } else {
                this._listeners = {};
            }
        },
        disconnect: function() {}
    };

    return socket;
};

var sockMock = function($rootScope) {
    this.events = {};
    this.emits = {};

    // intercept 'on' calls and capture the callbacks
    this.on = function(eventName, callback) {
        if (!this.events[eventName]) this.events[eventName] = [];
        this.events[eventName].push(callback);
    };

    // intercept 'emit' calls from the client and record them to assert against in the test
    this.emit = function(eventName, data, callback) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (!this.emits[eventName])
            this.emits[eventName] = [];
        this.emits[eventName].push(args);
        if (args[0] && isFunction(args[0]))
            args[0].appy(this, args);
    };

    //simulate an inbound message to the socket from the server (only called from the test)
    this.receive = function(eventName) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (this.events[eventName]) {
            angular.forEach(this.events[eventName], function(callback) {
                $rootScope.$apply(function() {
                    callback.apply(this, args);
                });
            });
        };
    };

};