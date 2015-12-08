(function () {
    "use strict";

    //controller to select patients in the pateint widget modal dialogue
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

            //save settings into local storage
            $scope.saveSettings = function () {
                $scope.item.widgetSettings.id = $scope.selectedPatient.id;
                $scope.$parent.selectedPatient = $scope.selectedPatient;
            };

        }
    ]);
})();