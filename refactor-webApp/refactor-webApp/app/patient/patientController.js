(function() {
    "use strict";
    
    angular.module('app').controller("patientController", ["$scope", "$http", "dataService1",

    function($scope, $http, dataService1) {
      
        $scope.patientSearch = function () {
                dataService1.getPatients()
                    .then(function () {

                    }),
                function () {

                }
            }        

    }]);               
})();
