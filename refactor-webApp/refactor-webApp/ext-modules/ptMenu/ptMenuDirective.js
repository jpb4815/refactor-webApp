(function () {
    "use strict";

    angular.module('ptMenu').directive('ptMenu', ['$timeout', function ($timeout) {
        return {
            scope: {

            },
            transclude: true,
            templateUrl: 'ext-modules/ptMenu/ptMenuTemplate.html',
            controller: 'ptMenuController',
            link: function (scope, el, attr) {
                var item = el.find('.pt-selectable-item:first');
                $timeout(function () {
                    item.trigger('click');
                });
            }
        };
    }]);
})();