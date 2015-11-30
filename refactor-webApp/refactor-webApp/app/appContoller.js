(function () {
    "use strict";
    angular.module('app').controller('appController',
    ['$scope',

        function ($scope) {
            $scope.state = 'unauthorized';
            $scope.isRegister = false;
            $scope.signIn = function () {
                $scope.state = "authorized";
            };

            $scope.register = function() {
                $scope.isRegister = !$scope.isRegister;
            }
        }
    ]);
})();