(function () {
    "use strict";

    //Dashboard directive, this controlls how the dashboard works. All of the gridster settings live in here
    angular.module('app').directive('ptaDashboard', ["$localStorage",
        function ($localStorage) {
            return {
                //isolate scope defined
                scope: {
                },
                //element directive for the dashboard
                template: '<pt-DashBoard></pt-Dashboard>',
                link: function (scope) {

                    scope.title = "Admin Dashboard";

                    //set the gridster otpions
                    scope.gridsterOpts = {
                        columns: 12,
                        margins: [20, 20],
                        outerMargin: false,
                        pushing: true,
                        floating: false,
                        swapping: false
                    };

                    //definitions for each type of widget, program, provider, and patient
                    scope.widgetDefinitions = [
                        {
                            title: "Program",
                            settings: {
                                sizeX: 3,
                                sizeY: 3,
                                minsizeX: 2,
                                minSizeY: 2,
                                template: '<pta-program></pta-program>',
                                widgetSettings: {
                                    id: 1000,
                                    templateUrl: 'app/dialogs/ptaSelectProgramTemplate.html',
                                    controller: 'ptaSelectProgramController'
                                }
                            }
                        },
                        {
                            title: "Provider",
                            settings: {
                                sizeX: 5,
                                sizeY: 3,
                                template: '<pta-provider></pta-provider>',
                                widgetSettings: {
                                    id: 5001,
                                    templateUrl: 'app/dialogs/ptaSelectProviderTemplate.html',
                                    controller: 'ptaSelectProviderController'
                                }
                            }

                        },
                        {
                            title: "patient",
                            settings: {
                                sizeX: 5,
                                sizeY: 3,
                                template: '<pta-patient></pta-patient>',
                                widgetSettings: {
                                    id: 1003,
                                    templateUrl: 'app/dialogs/ptaSelectPatientTemplate.html',
                                    controller: 'ptaSelectPatientController'
                                }
                            }

                        }
                    ];
                    scope.widgets = $localStorage.widgets || [                                        
                    ];

                    //load widgets from local storage if they are there, if not get them from the "server"
                    scope.$watch('widgets', function() {
                        $localStorage.widgets = scope.widgets;
                    }, true);
                }
            }
        }
    ]);
})();