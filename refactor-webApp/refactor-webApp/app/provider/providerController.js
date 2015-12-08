(function () {
    "use strict";

    angular.module('app').controller("providerController", ["ptaResource", "$http" ,"$location", "$routeParams", "$timeout", providerController]);

    function providerController(ptaResource, $http, $location, $routeParams, $timeout) {
        /* jshint validthis: true */
        var vm = this;
        vm.originalProviders = [];
        vm.providers = [];

        var currentProviderId = $routeParams.id;

        //get a provider by id, otherwise get the list of providers in the database
        if (currentProviderId) {
            $http.get("http://localhost:55928/api/Providers/" + currentProviderId).
                    //success
                then(function(provider) {
                    vm.provider = provider.data;
                    },
                    //error
                     function(errorMessage) {
                        alert(errorMessage);
                    }
                );
        } else {
            $http.get("http://localhost:55928/api/Providers")
                .then(function(result) {
                        //success
                        angular.copy(result.data, vm.providers);
                        angular.copy(result.data, vm.originalProviders);
                    },
                    function(errorMessage) {
                        //error
                        alert(errorMessage);
                    });
        }

        //reroute to the user entry screen to add a provider
        vm.addProvider = function () {
            $location.path("/userentry");
            $location.replace(); //removes the history item.
        }

        //open the update provider screen
        vm.openWindow = function (provider) {
            // opens the update view
            $location.url('/provider/' + provider.id);
            //wipe the history since they shouldn't use the back button
            $location.replace();
        }

        //go back to the list view from the update screen
        vm.goBackToView = function() {
            $location.url('/provider');
            $location.replace();
        }

        //save the updated provider
        vm.save = function () {
            vm.errorMessage = null;
            vm.successMessage = null;
            //This is used to control the loader so the user does not hose the system by mashing the submit button
            vm.saving = true;
            $http.put("http://localhost:55928/api/Providers/" + vm.provider.id, vm.provider).then(
                function () {
                    // TODO maybe we should always disable until they go back to the view look into this
                    vm.saving = false;
                    vm.successMessage = vm.provider.firstName + " " + vm.provider.lastName + " has been updated!";
                    $timeout(function () {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500 /*1.5 seconds*/);
                },
                function() {
                    vm.errorMessage = "Failed to update " + vm.provider.firstName + " " + vm.provider.lastName;
                });
        }

        //delete a provider
        vm.deleteProvider = function() {
            vm.errorMessage = null;
            vm.successMessage = null;
            // keep user from mashing the delete button
            vm.saving = true;

            $http.delete("http://localhost:55928/api/Providers/" + vm.provider.id, vm.provider).then(
                function() {
                    vm.saving = false;
                    vm.successMessage = vm.provider.firstName + " " + vm.provider.lastName + "Has been deleted...";
                    $timeout(function() {
                        vm.saving = false;
                        vm.successMessage = null;
                        vm.goBackToView();
                    }, 1500 /*1.5 seconds*/);
                },
                function() {
                    vm.errorMessage = "Failed to delete" + vm.provider.firstName + " " + vm.provider.lastName;
                });
        }

        //search for a provider
        vm.search = function(searchText) {
            $http.get("http://localhost:55928/api/Providers?query=" + (searchText == null ? "" : searchText))
                .then(function(response) {
                        //success
                        angular.copy(response.data, vm.providers);
                    },
                    function(errorMessage) {
                        //error
                        alert(errorMessage);
                    });
        }

        //clear search field and return to list view
        vm.clear = function() {
            vm.searchText = null;
            angular.copy(vm.originalProviders, vm.providers);
        }




    }

})();