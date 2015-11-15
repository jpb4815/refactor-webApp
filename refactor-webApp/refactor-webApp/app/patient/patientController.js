(function () {
    "use strict";

    angular.module('app').controller("patientController", ["$http", "$location", patientController]);

    function patientController($http, $location) {
        /* jshint validthis: true */
        var vm = this;
        vm.patients = [];

        $http.get("http://localhost:55928/api/Patients")
            .then(function (result) {
                //success
                angular.copy(result.data, vm.patients);
            },
                function () {
                    //error
                    alert("you suck Die!!!!!!");
                });

        vm.addPatient = function () {
            $location.path("/userentry");
        }




    }

})();
