(function() {
    "use strict";

    angular.module('app').controller("userEntryController", ["$http", "$timeout", "$location", userEntryController]);

    function userEntryController($http, $timeout, $location) {
        var vm = this;
        vm.roles = [
            { id: 1, name: "Admin" },
            { id: 2, name: "Doctor" },
            { id: 3, name: "Therapist" },
            { id: 4, name: "Patient" }
        ];
        vm.user = {
            //Remove if you don't want a default value selected
            useRole: vm.roles[0].id
        };
        vm.newUser = {
            //Remove if you don't want a default value selected
            useRole: vm.roles[0].id
        };
        vm.saving = true;
        vm.successMessage = null;
        vm.errorMessage = null;


        //save the form data to the user table
        vm.saveUser = function () {
            $http.post("http://localhost:55928/api/Users/", vm.user)
                .then(function() {
                    //success
                    vm.saving = false;
                    vm.successMessage = "User has been updated ....";
                        $timeout(function() {
                            vm.saving = false;
                            vm.successMessage = null;
                            vm.user = {};
                            //route back to the dashboard
                            $location.url("/dashboard");
                        }, 1500);
                    },
                    function() {
                        //error
                        vm.errorMessage = "Failed to save User ...";
                    });
        }

        
    }
})();