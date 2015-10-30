(function() {
    "use strict";

    angular.module('app').controller("patientController",["$scope", function($scope) {
        $scope.patientName = "joe";
        console.log("Patient controller");
    }]);
   
})();
