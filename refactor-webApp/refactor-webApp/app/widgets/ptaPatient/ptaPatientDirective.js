(function () {
    "use strict";
    //custom directive to display the patient widget on tha dash board
    angular.module('app').directive('ptaPatient',
    ['dataService',
    function (dataService) {
        return {
            templateUrl: 'app/widgets/ptaPatient/ptaPatientTemplate.html',
            link: function (scope, el, attrs) {
                scope.isLoaded = false;
                scope.hasError = false;
                scope.selectedPatient = null;

                scope.loadPatient = function () {
                    scope.hasError = false;
                    dataService.getPatient(scope.item.widgetSettings.id)
                        .then(function(data) {
                                //success
                                scope.selectedPatient = data;
                                scope.isLoaded = true;
                                scope.hasError = false;
                            },
                            function(data) {
                                //error
                                scope.hasError = true;
                            });
                };
                scope.loadPatient();
            }
        };
    }]);
})();