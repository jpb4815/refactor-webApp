// providers Directive
(function() {
    "use strict";

    angular.module('app').directive('ptaProviders', [function () {
        return {
            scope: {
            },
            templateUrl: "app/provider/providerViewTemplate.html"
        }
    }]);
})();