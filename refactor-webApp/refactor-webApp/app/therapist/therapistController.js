(function () {
    "use strict";

    angular.module('app').controller("therapistController", ["$http", "$location", therapistController]);

    function therapistController($http, $location) {
        /* jshint validthis: true */
        var vm = this;
        vm.therapists = [];

        $http.get("http://localhost:55928/api/Therapists")
            .then(function (result) {
                //success
                angular.copy(result.data, vm.therapists);
            },
                function () {
                    //error
                    alert("you suck Die!!!!!!");
                });

        vm.addTherapist = function () {
            $location.path("/userentry");
        }




    }

})();