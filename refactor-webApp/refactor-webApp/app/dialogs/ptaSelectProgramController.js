(function () {
    "use strict";

    //controller to deal with loading the program info into the program wodget via the modal dialogue
    angular.module('app').controller('ptaSelectProgramController',
    ["$scope", "dataService",

        function ($scope, dataService) {
            $scope.isLoaded = false;
            dataService.getPrograms().then(function (data) {
                $scope.programs = data;
                $scope.isLoaded = true;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === $scope.item.widgetSettings.id)
                        $scope.selectedProgram = data[i];
                }
            });

            //save the settings into local storage
            $scope.saveSettings = function () {
                $scope.item.widgetSettings.id = $scope.selectedProgram.id;
                $scope.$parent.selectedProgram = $scope.selectedProgram;
                $scope.$close();
            };
        }
    ]);
})();