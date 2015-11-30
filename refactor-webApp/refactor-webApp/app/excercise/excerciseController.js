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

        
           
        vm.addExcercise = function () {
            vm.isAddExe = !vm.isAddExe;
        }

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

       vm.openWindow = function(excercise) {
           //opens up the update view
           $location.url('/excercise/' + excercise.id);
           //wipe the history
           $location.replace();
       }

       vm.goBackToView = function () {
           $location.url('/excercise');
           $location.replace();
       }

        vm.saveUpdatedExcercise = function() {
            vm.errorMessage = null;
            vm.successMessage = null;
            //used to control the loader so that the user does not hose the system by mashing the submit button
            vm.saving = true;
            $http.put("http://localhost:55928/api/Excercises/" + vm.excercise.id, vm.excercise).then(
                function() {
                    vm.saving = false;
                    vm.successMessage = "Excercise has been Updated ...!";
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

        vm.clear = function() {
            vm.searchText = null;
            angular.copy(vm.originalExcercises, vm.excercises);
        }


    }

})();