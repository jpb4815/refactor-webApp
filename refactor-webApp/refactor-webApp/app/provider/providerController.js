(function () {
    "use strict";

    angular.module('app').controller("providerController", ["ptaResource", "$http" ,"$location", "$routeParams", "$timeout", providerController]);

    function providerController(ptaResource, $http, $location, $routeParams, $timeout) {
        /* jshint validthis: true */
        var vm = this;
        vm.originalProviders = [];
        vm.providers = [];

        var currentProviderId = $routeParams.id;

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

        vm.addProvider = function () {
            $location.path("/userentry");
            $location.replace(); //removes the history item.
        }
        vm.openWindow = function (provider) {
            // opens the update view
            $location.url('/provider/' + provider.id);
            //wipe the history since they shouldn't use the back button
            $location.replace();
        }

        vm.goBackToView = function() {
            $location.url('/provider');
            $location.replace();
        }

        vm.updateProvider = function(provider) {
            console.log(provider.id);
        }

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

        vm.clear = function() {
            vm.searchText = null;
            angular.copy(vm.originalProviders, vm.providers);
        }




    }

})();