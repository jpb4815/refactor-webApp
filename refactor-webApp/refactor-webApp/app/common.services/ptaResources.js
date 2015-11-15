(function() {
    "use strict";
    angular.module("commonServices")
        .factory("ptaResource", function ($http , $q) {
            var excercises = [];
            var injuries = [];
            var providers = [];
            var therapists = [];
            var excerciseDictionaries = [];
            var deferred = $q.defer();
            var url = "http://localhost:55928";
            var isInit = false;

            var isReady = function() {
                return !isInit;
            }

            var getExcercises = function() {
                $http.get(url + "/api/excercises")
                    .then(function(result) {
                            //successful
                        angular.copy(result.data, excercises);
                            isInit = true;
                            deferred.resolve();
                        },
                        function () {
                            //error
                            deferred.reject();
                        });
                return deferred.promise;

            }

            var addExcercise = function (newExcercise) {
                var deferred = $q.defer();
                $http.post(url + "/api/excercises", newExcercise)
                    .then(function(result) {
                            //success
                            var newlyAddedExcercise = result.data;
                            excercises.splice(0, 0, newlyAddedExcercise);
                            deferred.resolve(newlyAddedExcercise);

                        },
                        function() {
                            //error
                            deferred.reject();
                        });

                return deferred.promise;

            }

            var getInjuries = function() {
                $http.get(url + "/api/InjuryDictionaries")
                    .then(function(response) {
                            //success
                            angular.copy(response.data, injuries);
                            deferred.resolve();
                        },
                        function() {
                            deferred.reject();
                        });
                return deferred.promise;
            }


            var addInjuries = function (newInjury) {
                var deferred = $q.defer();
                $http.post(url + "/api/InjuryDictionaries", newInjury)
                    .then(function (result) {
                        //success
                        var newlyAddedInjury = result.data;
                        injuries.splice(0, 0, newlyAddedInjury);
                        deferred.resolve(newlyAddedInjury);
                    },
                        function () {
                            //error
                            deferred.reject();
                        });

                return deferred.promise;

            }

            var saveExcercises = function(newExcercise) {
                $http.post(url + "/api/ExcerciseDictionaries")
                    .then(function(result) {
                            //success
                            var newlyAddedExcercise = result.data;
                            excerciseDictionaries.splice(0, 0, newlyAddedExcercise);
                            deferred.resolve(newlyAddedExcercise);
                        },
                        function() {
                            //error
                            deferred.reject();
                        });
                return deferred.promise;
            }

           var getProviders = function() {
               $http.get(url + "api/Providers")
               .then(function (response) {
                   //success
                   angular.copy(response.data, providers);
                   deferred.resolve();
               },
                        function () {
                            deferred.reject();
                        });
               return deferred.promise;
           }

            return {
                injuries: injuries,
                excercises: excercises,
                providers: providers,
                therapists: therapists,
                excerciseDictionaries:excerciseDictionaries,
                getExcercises: getExcercises,
                addExcercise: addExcercise,
                isReady: isReady,
                getInjuries: getInjuries,
                addInjuries: addInjuries,
                saveExcercises: saveExcercises,
                getProviders: getProviders
        };

        });

})();
