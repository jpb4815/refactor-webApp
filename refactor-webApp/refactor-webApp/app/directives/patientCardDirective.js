// patient card
(function () {
    "use strict";

    angular.module('app').directive('patientCard', [function () {
        return {
            transclude: true,
            scope: {
            },
            templateUrl: "app/patient/patientCardTemplate.html",
            restrict: "E",
            controller: "patientController"
            
        }
    }]);
})