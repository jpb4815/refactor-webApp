(function () {
    "use strict";

    angular.module('app').controller("excerciseController", ["$http", "$location", "$routeParams", "$timeout", ExcerciseController]);


    function ExcerciseController($http, $location, $routeParams, $timeout) {
        /* jshint validthis: true */
        var vm = this;
        var url = "http://localhost:55928";
        vm.isAddExe = false;
        vm.originalExcercises = [];
        vm.excercises = [];
        vm.newExcercise = {};
        vm.successMessage = null;
        vm.errorMessage = null;

        var currentExcerciseId = $routeParams.id;


        //get exercise list, if there is an id get that excercise otherwise get all of the excercises
        if (currentExcerciseId) {
            $http.get(url + "/api/Excercises/" + currentExcerciseId).
                then(function(excercise) {
                    vm.excercise = excercise.data;
                }, function(errorMessage) {
                    //error
                    alert(errorMessage);
                });
        } else {
            $http.get(url + "/api/Excercises")
                .then(function(result) {
                        //success
                    angular.copy(result.data, vm.excercises);
                        angular.copy(result.data, vm.originalExcercises);
                    },
                    function(errorMessage) {
                        //error
                        vm.errorMessage = "Failed to load Excercises ...";
                    });
        }

        
        //toggle the add exercise form show and hide   
        vm.addExcercise = function () {
            vm.isAddExe = !vm.isAddExe;
        }

        //save a new exercise to the database table
        vm.saveNewExcercise = function (newExcercise) {
            $http.post(url + "/api/excercises", vm.newExcercise)
                .then(function(result) {
                        //success
                        var newlyAddedExcercise = result.data;
                        vm.excercises.splice(0, 0, newlyAddedExcercise);
                    },
                    function() {
                        //error
                        vm.errorMessage =
                        "Failed to add Excercise";
                    });
        }


        //open the update excercise window and allow update or delet
       vm.openWindow = function(excercise) {
           //opens up the update view
           $location.url('/excercise/' + excercise.id);
           //wipe the history
           $location.replace();
       }

        // go back to the list view
       vm.goBackToView = function () {
           $location.url('/excercise');
           $location.replace();
       }

        //save an updated exercise to the database
        vm.saveUpdatedExcercise = function() {
            vm.errorMessage = null;
            vm.successMessage = null;
            //used to control the loader so that the user does not hose the system by mashing the submit button
            vm.saving = true;
            $http.put("http://localhost:55928/api/Excercises/" + vm.excercise.id, vm.excercise).then(
                function() {
                    vm.saving = false;
                    vm.successMessage = "Excercise has been Updated ...!";

                    //using time out her so that we see our message
                    $timeout(function() {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500);
                },
                function() {
                    //error
                    vm.errorMessage = "failed to update Excercise";
                });
        }


        //Delete an exercise from the database
        vm.deleteExcercise = function () {
            vm.errorMessage = null;
            vm.successMessage = null;
            // keep user from mashing the delete button
            vm.saving = true;

            $http.delete("http://localhost:55928/api/Excercises/" + vm.excercise.id, vm.excercise).then(
                function () {
                    vm.saving = false;
                    vm.successMessage = "Excercise Has been deleted...";
                    $timeout(function () {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500 /*1.5 seconds*/);
                },
                function () {
                    vm.errorMessage = "Failed to delete Excercise";
                });
        }


        //search for an excercise by different fields
        vm.search = function (searchText) {

            $http.get("http://localhost:55928/api/Excercises?query=" + (searchText == null ? "" : searchText))
                .then(function(response) {
                    //success
                        angular.copy(response.data, vm.excercises);
                    },
                    //Error
                    function (errorMessage) {
                        alert(errorMessage);
                    });

        }

        //clear search box and return to list view
        vm.clear = function() {
            vm.searchText = null;
            angular.copy(vm.originalExcercises, vm.excercises);
        }


    }

})();