(function () {
    "use strict";

    angular.module('ptMenu').directive('ptMenuGroup', function () {
        return {
            require: '^ptMenu',
            transclude: true,
            scope: {
                label: '@',
                icon: '@'
            },
            templateUrl: 'ext-modules/ptMenu/ptMenuGroupTemplate.html',
            link: function (scope, el, attrs, ctrl) {
                scope.isOpen = false;
                scope.closeMenu = function () {
                    scope.isOpen = false;
                };
                scope.clicked = function () {
                    scope.isOpen = !scope.isOpen;

                    if (el.parents('.pt-subitem-section').length == 0)
                        scope.setSubmenuPosition();

                    ctrl.setOpenMenuScope(scope);
                };
                scope.isVertical = function () {
                    return ctrl.isVertical() || el.parents('.pt-subitem-section').length > 0;
                };

                scope.setSubmenuPosition = function () {
                    var pos = el.offset();
                    $('.pt-subitem-section').css({ 'left': pos.left + 20, 'top': 36 });
                };
            }
        };
    });
})();