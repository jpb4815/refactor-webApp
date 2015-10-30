(function () {
    "use strict";

    angular.module('app').directive('ptaPatient',
    ['dataService',
    function (dataService) {
        return {
            templateUrl: 'app/widgets/ptaPatient/ptaPatientTemplate.html',
            link: function (scope, el, attrs) {
                scope.selectedPatient = null;
                dataService.getPatient(scope.item.widgetSettings.id)
                    .then(function (data) {
                        scope.selectedPatient = data;
                    });
            }
        };
    }]);
})();