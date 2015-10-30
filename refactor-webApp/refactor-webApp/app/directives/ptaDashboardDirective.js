(function () {
    "use strict";

    angular.module('app').directive('ptaDashboard', ["$localStorage",
        function ($localStorage) {
            return {
                scope: {

                },
                template: '<pt-DashBoard></pt-Dashboard>',
                link: function (scope) {

                    scope.title = "Admin Dashboard";

                    scope.gridsterOpts = {
                        columns: 12,
                        margins: [20, 20],
                        outerMargin: false,
                        pushing: true,
                        floating: false,
                        swapping: false
                    };

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
                    scope.$watch('widgets', function() {
                        $localStorage.widgets = scope.widgets;
                    }, true);
                }
            }
        }
    ]);
})();