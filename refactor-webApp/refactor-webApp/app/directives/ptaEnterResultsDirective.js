//enter results directive
(function() {
    "use strict";

    angular.module('app').directive('ptaEnterResults', [function () {
        return {
            scope: {
            },
            templateUrl: "app/patient/enterResultsTemplate.html"
        }
    }]);
})();