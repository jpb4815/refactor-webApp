// results directive
(function() {
    "use strict";

    angular.module('app').directive('ptaResults', [function () {
        return {
            scope: {
            },
            templateUrl: "app/results/viewResultsTemplate.html"
        }
    }]);
})