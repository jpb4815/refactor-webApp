(function () {
    "use strict";

    angular.module('app').controller("providerController", ["ptaResource","$http" ,"$location", providerController]);

    function providerController(ptaResource,$http, $location) {
        /* jshint validthis: true */
        var vm = this;
        vm.providers = [];

        $http.get("http://localhost:55928/api/Providers")
            .then(function(result) {
                //success
                    angular.copy(result.data, vm.providers);
                },
                function() {
                    //error
                    alert("you suck Die!!!!!!");
                });

        vm.addProvider = function () {
            $location.path("/userentry");
        }




    }

})();