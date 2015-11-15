// results directive
(function() {
    "use strict";

    angular.module('app').directive('ptaResults', [function () {
        return {
            transclude: true,
            scope: {
            },
            templateUrl: "app/results/viewResultsTemplate.html",
           
        }
    }]);
})