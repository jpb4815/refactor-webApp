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
                    controller: 'providerController'
                }
            },
            {
                url: '/enterresults',
                config: {
                    template: '<pta-enter-results></pta-enter-results>',
                    controller: 'patientController'
                }
            },
            {
                url: '/viewresults',
                config: {
                    template: '<pta-view-results></pta-view-results>',
                    controller: 'patientController'
                }
            },
            {
                url: '/injurydictionary',
                config: {
                    template: '<pta-injury-dictionary></pta-injury-dictionary>',
                    controller: 'providerController'
                }
            },
            {
                url: '/excercisedictionary',
                config: {
                    template: '<pta-excercise-dictionary></pta-excercise-dictionary>',
                    controller: 'providerController'
                }
            },
            {
                url: '/therapist',
                config: {
                    template: '<pta-therapist></pta-therapist>',
                    controller: 'therapistController'
                }
            },
            {
                url: '/programentry',
                config: {
                    template: '<pta-program-entry></pta-program-entry>',
                    controller: 'programsController'
                }
            },
            {
                url: '/results',
                config: {
                    template: '<pta-results></pta-results>',
                    controller: 'resultsController'
                }
            },
            {
                url: '/excercise',
                config: {
                    template: '<pta-excercise></pta-excercise>',
                    controller: 'excerciseController'
                }
            }
        ];

        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/dashboard' });

    }]);

})();
