(function() {
    "use strict";

    angular.module("app")
        .controller("excerciseDictionaryController", ["$http","$location","$routeParams","$timeout", ExcerciseDictionaryController]);

    //constructor function for the exercise controller
    function ExcerciseDictionaryController($http, $location, $routeParams, $timeout) {
        /* jshint validthis: true */
        var vm = this;
        vm.isAddExe = false;
        vm.originalExcercises = [];
        vm.excerciseDictionaries = [];
        vm.newExcercise = {};
        vm.successMessage = null;
        vm.errorMessage = null;

        var currentExcerciseId = $routeParams.id;


        //get exercises either by ID or as a list 
        if (currentExcerciseId) {
            $http.get("http://localhost:55928/api/ExcerciseDictionaries")
                .then(function(excercise) {
                        //success
                        vm.excercise = excercise.data;
                    },
                    function() {
                        vm.errorMessage = "Failed to load Excercises ...";
                    });
        } else {
            $http.get("http://localhost:55928/api/ExcerciseDictionaries")
                .then(function(result) {
                        //success
                        angular.copy(result.data, vm.excerciseDictionaries);
                        angular.copy(result.data, vm.originalExcercises);
                    },
                    //error
                    function() {
                        vm.errorMessage = "Failed to load Excercises ...";
                    });
        }

        //open window for single exercise
        vm.openWindow = function (excercise) {
                //opens up the update view
                $location.url('/excercisedictionary/' + excercise.id);
                //wipe the history
                $location.replace();

        }

        //toggle on add exercise view
        vm.addExcercise = function() {
            vm.isAddExe = !vm.isAddExe;
        }

        //save a new exercise
        vm.saveNewExcercise = function(newExcercise) {
            $http.post("http://localhost:55928/api/ExcerciseDictionaries", vm.newExcercise)
                .then(function(result) {
                        //success
                        var newlyaddedExcercise = result.data;
                        vm.excerciseDictionaries.splice(0, 0, newlyaddedExcercise);
                        vm.isAddExe = false;
                    },
                    function() {
                        //error
                        vm.errorMessage = "Failed to Save Excercise ...";
                    });
        }

        //go back to previous list view
        vm.goBackToView = function () {
            $location.url('/excercisedictionary');
            $location.replace();
        };


        //search based on parameters
        vm.search = function (searchText) {

            $http.get("http://localhost:55928/api/ExcerciseDictionaries?query=" + (searchText == null ? "" : searchText))
                .then(function (response) {
                    //success
                    angular.copy(response.data, vm.excerciseDictionaries);
                },
                    function (errorMessage) {
                        alert(errorMessage);
                    });
        }

        //clear search and go back to list view
        vm.clear = function () {
            vm.searchText = null;
            angular.copy(vm.originalExcercises, vm.excerciseDictionaries);
        }

        //update and save exercise
        vm.saveUpdatedExcercise = function () {
            vm.errorMessage = null;
            vm.successMessage = null;
            //used to control the loader so that the user does not hose the system by mashing the submit button
            vm.saving = true;
            $http.put("http://localhost:55928/api/ExcerciseDictionaries/" + vm.excercise.id, vm.excercise).then(
                function () {
                    vm.saving = false;
                    vm.successMessage = "Excercise has been Updated ...!";
                    $timeout(function () {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500);
                },
                function () {
                    //error
                    vm.errorMessage = "failed to update Excercise";
                });
        };

        //delete exercise
        vm.deleteExcercise = function () {
            vm.errorMessage = null;
            vm.successMessage = null;
            // keep user from mashing the delete button
            vm.saving = true;

            $http.delete("http://localhost:55928/api/ExcerciseDictionaries/" + vm.excercise.id, vm.excercise).then(
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

    }


})();