//Program entry directive
(function() {
    "use strict";

    angular.module('app').directive('ptaProgramEntry', [function () {
        return {
            scope: {
            },
            templateUrl: "app/therapist/programEntryTemplate.html"
        }
    }]);
})();