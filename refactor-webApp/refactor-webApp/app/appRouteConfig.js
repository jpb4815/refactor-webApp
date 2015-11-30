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
                url: '/patientlist/:id',
                config: {
                    templateUrl: 'app/patient/patientUpdateTemplate.html'
                }
            },
            {
                url: '/provider',
                config: {
                    templateUrl: "app/provider/providerViewTemplate.html"
                }
            },
            {
                url: '/provider/:id',
                config: {
                    templateUrl: "app/provider/providerUpdateTemplate.html"
                }
            },
            {
                url: '/injurydictionary',
                config: {
                    templateUrl: "app/Admin/injuryDictionaryTemplate.html"
                }
            },
            {
                url: '/injurydictionary/:id',
                config: {
                    templateUrl: "app/Admin/injuryDictionaryUpdateTemplate.html"
                }
            },
            {
                url: '/excercisedictionary',
                config: {
                    templateUrl: "app/Admin/excerciseDictionaryTemplate.html"
                }
            },
            {
                url: '/excercisedictionary/:id',
                config: {
                    templateUrl: "app/Admin/excerciseDictionaryUpdateTemplate.html"
                }
            },
            {
                url: '/therapist',
                config: {
                    templateUrl: "app/therapist/therapistViewTemplate.html"
                }
            },
            {
                url: '/therapist/:id',
                config: {
                    templateUrl: "app/therapist/therapistUpdateTemplate.html"
                }
            },
            {
                url: '/excercise',
                config: {
                    templateUrl:"app/excercise/excerciseViewTemplate.html"

                }
            },
            {
                url: '/excercise/:id',
                config: {
                    templateUrl: "app/excercise/excerciseUpdateTemplate.html"

                }
            },
            {
                url: '/userentry',
                config: {
                    templateUrl:"app/Admin/userEntryForm.html"
                }
            },
            {
                url: '/register',
                config: {
                    templateUrl: "app/login/registerTemplate.html"
                }
            }
        ];

        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/dashboard' });

    }]);

})();
