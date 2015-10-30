(function () {
    "use strict";
    angular.module('ptDashboard').directive('ptDashboard', function () {
        return {
            templateUrl: 'ext-modules/ptDashboard/ptDashboardTemplate.html',
            link: function (scope, element, attrs) {
                scope.addNewWidget = function (widget) {
                    var newWidget = angular.copy(widget.settings);
                    scope.widgets.push(newWidget);
                }
            }
        };
    });
})();