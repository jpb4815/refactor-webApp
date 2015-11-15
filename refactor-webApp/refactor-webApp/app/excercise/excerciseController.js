(function () {
    "use strict";

    angular.module('app').controller("excerciseController", ["ptaResource", "$http", ExcerciseController]);


    function ExcerciseController(ptaResource, $http) {
        /* jshint validthis: true */
        var vm = this;
        vm.searchField = "";
        vm.isAddExe = false;
        vm.excercises = ptaResource;
        vm.newExcercise = {};
        vm.isBusy = true;

       ptaResource.getExcercises()
                .then(function() {
                        //sucess
                    },
                    function() {
                        //error
                        alert("could not load excercises");
                    })
                .then(function() {
                    vm.isBusy = false;
                });
        
           
        vm.addExcercise = function () {
            vm.isAddExe = !vm.isAddExe;
        }

        vm.save = function() {
            ptaResource.addExcercise(vm.newExcercise)
                .then(function(result) {
                    //success
                        vm.isAddExe = false;
                    },
                    function() {
                        //error
                        alert("could not save the new excercise");
                    });
        }

        vm.updateExcercise = function() {
            vm.isUpdateExe = !vm.isUpdateExe;
        }


    }

})();