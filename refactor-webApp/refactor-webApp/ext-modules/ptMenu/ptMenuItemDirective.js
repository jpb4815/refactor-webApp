(function () {
    "use strict";

    angular.module('ptMenu').directive('ptMenuItem', function () {
        return {
            require: '^ptMenu',
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            templateUrl: 'ext-modules/ptMenu/ptMenuItemTemplate.html',
            link: function (scope, el, attr, ctrl) {

                scope.isActive = function () {
                    return el === ctrl.getActiveElement();
                };

                scope.isVertical = function () {
                    return ctrl.isVertical() || el.parents('.pt-subitem-section').length > 0;
                }

                el.on('click', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function () {
                        ctrl.setActiveElement(el);
                        ctrl.setRoute(scope.route);
                    });
                });
            }
        };
    });
})();