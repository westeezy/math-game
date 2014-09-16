'use strict';

(function(global, runs, waitsFor) {
    'use strict';

    function async(fn) {
        return function() {
            var done = false,
                complete = function() {
                    done = true;
                };

            runs(function() {
                fn(complete);
            });

            waitsFor(function() {
                return done;
            });
        }
    }

    global.async = async;
}(this, runs, waitsFor));

describe('stickyscroller tests', function() {
    var scope, $compile,
        template = '<div style="height: 100px; overflow-y: scroll" sticky-scroller><div ng-repeat="message in messages" style="height: 100px">{{message}}</div></div>';

    beforeEach(module('myApp'));

    beforeEach(inject(function($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;

        scope.messages = ["test1", "test2", "test3", "test4", "test5", "test6"]
    }));

    afterEach(function() {
        scope.$destroy();
    });

    function compile() {
        var elem = $compile(template)(scope);
        return elem.append('body');
    }

    it('should scroll to bottom of element on changes', function() {
        var $element = compile(),
            element = $element[0];
        scope.$digest();

        expect(element.scrollTop).toBe(element.scrollHeight - element.clientHeight);
    });

    it('should turn off auto scroll after user scrolled manually', async(function(done) {
        var $element = compile(),
            element = $element[0];

        scope.$digest();
        element.scrollTop = 0;

        setTimeout(function() {
            scope.name = "World";
            scope.$digest();

            expect(element.scrollTop).toBe(0);

            done();
        }, 10);
    }));

    it('should turn on auto scroll after user scrolled manually to bottom of element', async(function(done) {
        var $element = compile(),
            element = $element[0];

        scope.$digest();
        element.scrollTop = 0;

        setTimeout(function() {
            scope.$digest();
            expect(element.scrollTop).toBe(0);

            element.scrollTop = element.scrollHeight;
            setTimeout(function() {
                scope.$digest();

                expect(element.scrollTop).toBe(element.scrollHeight - element.clientHeight);

                done();
            });
        });
    }));
});