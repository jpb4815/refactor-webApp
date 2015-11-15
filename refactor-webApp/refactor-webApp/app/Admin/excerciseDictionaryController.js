(function() {
    "use strict";

    angular.module("app")
        .controller("excerciseDictionaryController", ["$http","ptaResource", ExcerciseDictionaryController]);

    function ExcerciseDictionaryController($http, ptaResource) {
        /* jshint validthis: true */
        var vm = this;
        vm.isAddExe = false;
        vm.excerciseDictionaries = [];
        vm.newExcercise = {};

        $http.get("http://localhost:55928/api/ExcerciseDictionaries")
            .then(function(result) {
                    //success
                    angular.copy(result.data, vm.excerciseDictionaries);
                },
                function() {
                    alert("cannot find dictionary entries");
                });
           

        vm.save = function() {
            ptaResource.saveExcercises()
                .then(function(result) {
                        //success
                        vm.isAddExe = false;
                    },
                    function() {
                        //error
                        alert("could not save the dictionary entry");
                    });
        }

        vm.addExcercise = function () {
            vm.isAddExe = !vm.isAddExe;
        }
    }

})();