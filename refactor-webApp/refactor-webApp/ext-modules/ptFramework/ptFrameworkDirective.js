(function () {
    "use strict";

    angular.module("ptFramework").directive("ptFramework", function () {
        return {
            transclude: true,
            scope: {
                title: '@',
                subtitle: '@',
                iconFile: '@'
            },
            controller: "ptFrameworkController",
            templateUrl: "ext-modules/ptFramework/ptFrameworkTemplate.html"

        };
    });
})();