(function () {
    "use strict";

    angular.module('app').controller("patientController", ["$http", "$location", "$routeParams", "$timeout", patientController]);

    function patientController($http, $location, $routeParams, $timeout) {
        /* jshint validthis: true */
        var vm = this;
        vm.originalPatients = [];
        vm.patients = [];
        var currentPatientId = $routeParams.id;

        if (currentPatientId) {
            $http.get("http://localhost:55928/api/Patients/" + currentPatientId).
                //success
                then(function(patient) {
                        vm.patient = patient.data;
                    },
                    //error
                    function(errorMessage) {
                        alert(errorMessage);
                    }
                );
        } else {
            $http.get("http://localhost:55928/api/Patients")
                .then(function(result) {
                        //success
                        angular.copy(result.data, vm.patients);
                        angular.copy(result.data, vm.originalPatients);
                    },
                    function(errorMessage) {
                        //error
                        alert(errorMessage);
                    });
        }

        

        vm.addPatient = function () {
            $location.path("/userentry");
            $location.replace(); //removes the history item.
        }

        vm.openWindow = function (patient) {
            // opens the update view
            $location.url('/patientlist/' + patient.id);
            //wipe the history since they shouldn't use the back button
            $location.replace();
        }

        vm.goBackToView = function () {
            $location.url('/patientlist');
            $location.replace();
        }

        vm.save = function () {
            vm.errorMessage = null;
            vm.successMessage = null;
            //This is used to control the loader so the user does not hose the system by mashing the submit button
            vm.saving = true;
            $http.put("http://localhost:55928/api/Patients/" + vm.patient.id, vm.patient).then(
                function () {
                    // TODO maybe we should always disable until they go back to the view look into this
                    vm.saving = false;
                    vm.successMessage = "Patient has been updated! ...";
                    $timeout(function () {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500 /*1.5 seconds*/);
                },
                function () {
                    vm.errorMessage = "Failed to update Patient ...";
                });
        }

        vm.deletePatient = function () {
            vm.errorMessage = null;
            vm.successMessage = null;
            // keep user from mashing the delete button
            vm.saving = true;

            $http.delete("http://localhost:55928/api/Patients/" + vm.patient.id, vm.patient).then(
                function () {
                    vm.saving = false;
                    vm.successMessage = "Patient has been deleted! ...";
                    $timeout(function () {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500 /*1.5 seconds*/);
                },
                function () {
                    vm.errorMessage = "Failed to delete Patient ...";
                });
        }

        vm.search = function(searchText) {

            $http.get("http://localhost:55928/api/Patients?query=" + (searchText == null ? "" : searchText))
                .then(function(response) {
                        //success
                        angular.copy(response.data, vm.patients);
                    },
                    function(errorMessage) {
                        alert(errorMessage);
                    });

        };

        vm.clear = function() {
            vm.searchText = null;
            angular.copy(vm.originalPatients, vm.patients);
        };


    }

})();
