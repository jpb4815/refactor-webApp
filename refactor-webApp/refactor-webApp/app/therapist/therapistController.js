(function () {
    "use strict";

    angular.module('app').controller("therapistController", ["$http", "$location","$routeParams", "$timeout", therapistController]);

    function therapistController($http, $location, $routeParams, $timeout) {
        /* jshint validthis: true */
        var vm = this;
        vm.originalTherapists = []; 
        vm.therapists = [];
     

        var currentTherapistId = $routeParams.id;

        if (currentTherapistId) {
            $http.get("http://localhost:55928/api/Therapists/" + currentTherapistId).
                //success
                then(function(therapist) {
                        vm.therapist = therapist.data;
                    },
                    function(errorMessage) {
                        alert(errorMessage);
                    });
        } else {
            $http.get("http://localhost:55928/api/Therapists")
                .then(function(result) {
                        //success
                        angular.copy(result.data, vm.therapists);
                        angular.copy(result.data, vm.originalTherapists);
                    },
                    function(errorMessage) {
                        //error
                        alert(errorMessage);
                    });
        }
        
        //go to user entry form
        vm.addTherapist = function () {
            $location.path("/userentry");
        }

        //opens the update view 
        vm.openWindow = function(therapist) {
            $location.url('/therapist/' + therapist.id);
            //wipe history so that they cant use the back button
            $location.replace();
        }

        //go back to list view
        vm.goBackToView = function() {
            $location.url('/therapist');
            $location.replace();
        }

        vm.updateTherapist = function(therapist) {
            console.log(therapist.id);
        }

        vm.save = function() {
            vm.errorMessage = null;
            vm.successMessage = null;
            //keep users from mashing the button and hosing the system
            vm.saving = true;
            $http.put("http://localhost:55928/api/Therapists/" + vm.therapist.id, vm.therapist).then(
                function() {
                    vm.saving = false;
                    vm.successMessage = "Therapist has been updated!";
                    $timeout(function() {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500);
                },
                function() {
                    vm.errorMessage = "Failed to update Therapist ....";
                    alert(errorMessage);
                });
        }

        vm.deleteTherapist = function() {
            vm.errorMessage = null;
            vm.successMessage = null;
            //Keep the user from mashing the button and hosing the system
            vm.saving = true;

            $http.delete("http://localhost:55928/api/Therapists/" + vm.therapist.id, vm.therapist).then(
                function() {
                    vm.saving = false;
                    vm.successMessage = " Therapist Has been deleted...";
                    $timeout(function() {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500 /*1.5 seconds*/);
                },
                function() {
                    vm.errorMessage = "Failed to delete Therapist ...";
                });
        }

        vm.search = function(searchText) {
            $http.get("http://localhost:55928/api/Therapists?query=" + (searchText == null ? "" : searchText))
                .then(function(response) {
                        //success
                        angular.copy(response.data, vm.therapists);
                    },
                    //error
                    function(errorMessage) {
                        alert(errorMessage);
                    });
        };

        vm.clear = function() {
            vm.searchText = null;
            angular.copy(vm.originalTherapists, vm.therapists);

        };


    }

})();