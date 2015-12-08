(function () {
    "use strict";

    //controller to load the provider info into the provider widget via the modal dialogue
    angular.module('app').controller('ptaSelectProviderController',
    ["$scope", "dataService",
        function ($scope, dataService) {
            $scope.isLoaded = false;
            dataService.getProviders().then(function (data) {
                $scope.providers = data;
                $scope.isLoaded = true;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].d == $scope.item.widgetSettings.id)
                        $scope.selectedProvider = data[i];
                }
            });


            //Save the settings into local storage
            $scope.saveSettings = function () {
                $scope.item.widgetSettings.id = $scope.selectedProvider.id;
                $scope.$parent.selectedProvider = $scope.selectedProvider;
                $scope.$close();
            };
        }
    ]);
})();