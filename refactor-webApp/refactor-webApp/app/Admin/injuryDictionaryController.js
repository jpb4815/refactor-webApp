(function () {
    "use strict";
    angular.module("app")
        .controller("injuryDictionaryController", ["$http", "$location", "$routeParams", "$timeout", InjuryDictionaryController]);

    //constructor function for the Injury Dictionary Controller
    function InjuryDictionaryController($http, $location, $routeParams, $timeout) {
        var vm = this;
        vm.originalInjuries = [];
        vm.injuries = [];
        vm.newInjury = {};
        vm.isAddInjury = false;

        //used to get the id from the route params
        var currentInjuryID = $routeParams.id;

        //get list of dictionay entries or a singular entry
        if (currentInjuryID) {
            $http.get("http://localhost:55928/api/InjuryDictionaries/" + currentInjuryID)
                .then(function (injury) {
                    //success
                    vm.injury = injury.data;
                },
                    //error
                    function (errorMessage) {
                        alert(errorMessage);
                    });
        } else {
            $http.get("http://localhost:55928/api/InjuryDictionaries")
            .then(function (response) {
                //success
                angular.copy(response.data, vm.injuries);
                angular.copy(response.data, vm.originalInjuries);
                
            },
                function (errorMessage) {
                    alert(errorMessage);
                });
        }

        //toggle the add injury view on and off
        vm.addInjury = function () {
            vm.isAddInjury = !vm.isAddInjury;
        }

        //open the Update and Delete view
        vm.openWindow = function (injury) {
            // opens the update view
            $location.url('/injurydictionary/' + injury.id);
            //wipe the history since they shouldn't use the back button
            $location.replace();
        }

        //since the back button in the browser is disabled use this to get back to list view
        vm.goBackToView = function () {
            $location.url('/injurydictionary');
            $location.replace();
        }

        //Save a newly added injury
        vm.saveNewInjury = function (newInjury) {
            $http.post("http://localhost:55928/api/InjuryDictionaries", vm.newInjury)
                .then(function (result) {
                    //success
                    $timeout(function () {
                        var newlyAddedInjury = result.data;
                        vm.injuries.splice(0, 0, newlyAddedInjury);
                    }, 1500);
                    vm.isAddInjury = !vm.isAddInjury;


                },
                    function () {
                        //error
                        alert("could not save dictionary entry");
                    });
        }

        //search dictionary based on text box entry
        vm.search = function (searchText) {

            $http.get("http://localhost:55928/api/InjuryDictionaries?query=" + (searchText == null ? "" : searchText))
                .then(function(response) {
                    //success
                    angular.copy(response.data, vm.injuries);
                    },
                    function(errorMessage) {
                        alert(errorMessage);
                    });

        }

        //clear text box and go back to view
        vm.clear = function () {
            vm.searchText = null;
            angular.copy(vm.originalInjuries, vm.injuries);
        }

        //save the updated entry
        vm.save = function () {
            vm.errorMessage = null;
            vm.successMessage = null;
            //used to control the loader so that the user does not hose the system by mashing the submit button
            vm.saving = true;
            $http.put("http://localhost:55928/api/Injuries/" + vm.injruy.id, vm.injury).then(
                function () {
                    vm.saving = false;
                    vm.successMessage = "Injury has been Updated ...!";
                    $timeout(function () {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500);
                },
                function () {
                    //error
                    vm.errorMessage = "failed to update Injury";
                });
        }

        //delete dictionary Entry
        vm.delete = function () {
            vm.errorMessage = null;
            vm.successMessage = null;
            // keep user from mashing the delete button
            vm.saving = true;

            $http.delete("http://localhost:55928/api/Injuries/" + vm.injury.id, vm.injury).then(
                function () {
                    vm.saving = false;
                    vm.successMessage = "Injury Has been deleted...";
                    $timeout(function () {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500 /*1.5 seconds*/);
                },
                function () {
                    vm.errorMessage = "Failed to delete Injury";
                });
        }
    }
})();