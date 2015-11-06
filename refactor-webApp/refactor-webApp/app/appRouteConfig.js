(function () {
    "use strict";
    angular.module('app').config(['$routeProvider', function ($routeProvider) {

        var routes = [
            {
                url: '/dashboard',
                config: {
                    template: '<pta-dashboard></pta-dashboard>'
                }
            },
            {
                url: '/patientlist',
                config: {   
                    template: '<pta-patient-list></pta-patient-list>',
                    controller: 'patientController'
                }
            },
            {
                url: '/provider',
                config: {
                    template: '<pta-providers></pta-providers>',
                    controller: 'providerController',
                    controllerAs: 'vm'
                }
            },
            {
                url: '/enterresults',
                config: {
                    template: '<pta-enter-results></pta-enter-results>',
                    controller: 'patientController',
                    controllerAs: 'vm'
                }
            },
            {
                url: '/viewresults',
                config: {
                    template: '<pta-view-results></pta-view-results>',
                    controller: 'patientController',
                    controllerAs: 'vm'
                }
            },
            {
                url: '/injurydictionary',
                config: {
                    template: '<pta-injury-dictionary></pta-injury-dictionary>',
                    controller: 'providerController',
                    controllerAs: 'vm'
                }
            },
            {
                url: '/excercisedictionary',
                config: {
                    template: '<pta-excercise-dictionary></pta-excercise-dictionary>',
                    controller: 'providerController',
                    controllerAs: 'vm'
                }
            },
            {
                url: '/therapist',
                config: {
                    template: '<pta-therapist></pta-therapist>',
                    controller: 'therapistController',
                    controllerAs: 'vm'
                }
            },
            {
                url: '/programentry',
                config: {
                    template: '<pta-program-entry></pta-program-entry>',
                    controller: 'programsController',
                    controllerAs: 'vm'
                }
            },
            {
                url: '/results',
                config: {
                    template: '<pta-results></pta-results>',
                    controller: 'resultsController',
                    controllerAs: 'vm'
                }
            },
            {
                url: '/excercise',
                config: {
                    template: '<pta-excercise></pta-excercise>',
                    controller: 'excerciseController',
                    controllerAs: 'vm',
                    resolve: {
                        initialData:['ptaAPI', function(ptaAPI) {
                            return ptaAPI.getExcercises();
                        }]
                    }
                }
            }
        ];

        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/dashboard' });

    }]);

})();
