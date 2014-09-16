'use strict';

DirectiveModule
    .directive('stickyScroller', function() {
        return {
            restrict: 'A',
            link: function(scope, $el, attrs) {
                var el = $el[0],
                    model = function() {
                        return {
                            $setViewValue: function(value) {
                                this.$viewValue = value;
                            },
                            $viewValue: true
                        };
                    }();

                scope.$watch(function() {
                    if (model.$viewValue) {
                        el.scrollTop = el.scrollHeight;
                    }
                });

                $el.bind('scroll', function() {
                    var activate = el.scrollTop + el.clientHeight + 1 >= el.scrollHeight;
                    if (activate !== model.$viewValue) {
                        scope.$apply(model.$setViewValue.bind(model, activate));
                    }
                });
            }
        };
    });