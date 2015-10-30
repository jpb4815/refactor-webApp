(function() {
    "use strict";

    angular.module('app').directive('ptaProgram',
        ['dataService',
        function (dataService) {
            return {
                templateUrl: 'app/widgets/ptaProgram/ptaProgramTemplate.html',
                link: function (scope, el, attrs) {
                    scope.isLoaded = false;
                    scope.hasError = false;
                    scope.selectedProgram = null;

                    scope.loadProgram = function () {
                        scope.hasError = false;
                        dataService.getProgram(scope.item.widgetSettings.id)
                        .then(function (data) {
                            // success
                            scope.selectedProgram = data;
                            scope.isLoaded = true;
                            scope.hasError = false;
                        }, function (data) {
                            // error
                            scope.hasError = true;
                        });
                    };

                    scope.loadProgram();
                }
            };
        }]);

})();
