// results directive
(function() {
    "use strict";

    angular.module('app').directive('ptaResults', [function () {
        return {
            scope: {
            },
            templateUrl: "viewResultsTemplate.html"
        }
    }]);
})