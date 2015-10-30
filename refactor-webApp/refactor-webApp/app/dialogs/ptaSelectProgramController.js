(function () {
    "use strict";

    angular.module('app').controller('ptaSelectProgramController',
    ["$scope", "dataService",

        function ($scope, dataService) {
            $scope.isLoaded = false;
            dataService.getPrograms().then(function (data) {
                $scope.providers = true;
                $scope.isLoaded = true;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].d === $scope.item.widgetSettings.id)
                        $scope.selectedProgram = data[i];
                }
            });

            $scope.saveSettings = function () {
                $scope.item.widgetSettings.id = $scope.selectedProgram.id;
                $scope.$parent.selectedProgram = $scope.selectedProgram;
                $scope.$close();
            };
        }
    ]);
})();