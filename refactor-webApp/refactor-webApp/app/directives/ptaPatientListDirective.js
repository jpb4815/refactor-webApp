// patients directive
(function() {
    "use strict";

    angular.module('app').directive('ptaPatientList', [function () {
        return {
            scope: {
            },
            templateUrl: 'app/patient/patientViewTemplate.html'
        }
    }]);
})();