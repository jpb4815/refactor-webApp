(function () {
    "use strict";

    angular.module('app').controller('ptaSelectPatientController',
    ["$scope", "dataService",

        function ($scope, dataService) {
            $scope.isLoaded = false;
            dataService.getPatients().then(function (data) {
                $scope.patients = data;
                $scope.isLoaded = true;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == $scope.item.widgetSettings.id)
                        $scope.selectedPatient = data[i];
                }
            });

            $scope.saveSettings = function () {
                $scope.item.widgetSettings.id = $scope.selectedPatient.id;
                $scope.$parent.selectedPatient = $scope.selectedPatient;
            };

        }
    ]);
})();