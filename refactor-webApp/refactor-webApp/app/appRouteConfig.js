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
                    templateUrl: 'app/patient/patientViewTemplate.html'
                }
            },
            {
                url: '/provider',
                config: {
                    templateUrl: "app/provider/providerViewTemplate.html"
                }
            },
            {
                url: '/enterresults',
                config: {
                    templateUrl: "app/patient/enterResultsTemplate.html"
                }
            },
            {
                url: '/viewresults',
                config: {
                    templateUrl: "app/results/viewResultsTemplate.html"
                }
            },
            {
                url: '/injurydictionary',
                config: {
                    templateUrl: "app/Admin/injuryDictionaryTemplate.html"
                }
            },
            {
                url: '/excercisedictionary',
                config: {
                    templateUrl: "app/Admin/excerciseDictionaryTemplate.html"
                }
            },
            {
                url: '/therapist',
                config: {
                    templateUrl: "app/therapist/therapistViewTemplate.html"
                }
            },
            {
                url: '/programentry',
                config: {
                    templateUrl: "app/therapist/programEntryTemplate.html"
                    }
            },
            {
                url: '/results',
                config: {
                    templateUrl: "app/patient/enterResultsTemplate.html"
                }
            },
            {
                url: '/excercise',
                config: {
                    templateUrl:"app/excercise/excerciseViewTemplate.html"

                }
            },
            {
                url: '/userentry',
                config: {
                    templateUrl:"app/Admin/userEntryForm.html"
                }
            }
        ];

        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/dashboard' });

    }]);

})();
