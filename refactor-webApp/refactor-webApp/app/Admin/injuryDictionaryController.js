(function() {
    "use strict";
    angular.module("app")
        .controller("injuryDictionaryController", ["ptaResource", "$http", InjuryDictionaryController]);

    function InjuryDictionaryController(ptaResource, $http) {
        var vm = this;
        vm.injuries = [];
        vm.newInjury = {};
        vm.isAddInjury = false;

        $http.get("http://localhost:55928/api/InjuryDictionaries")
            .then(function(response) {
                    //success
                    angular.copy(response.data, vm.injuries);
                },
                function() {
                    alert("you Suck Die!!!!!!");
                });

        vm.addInjury = function() {
            vm.isAddInjury = ! vm.isAddInjury;
        }

        vm.save = function() {
            ptaResource.addInjuries()
                .then(function() {
                    //success
                    },
                    function() {
                        //error
                        alert("could not save dictionary entry");
                    });
        }
    }

    


})();