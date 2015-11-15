﻿(function () {
    "use strict";

    angular.module('app').directive('ptaProvider',
    ['dataService',
    function (dataService) {
        return {
            templateUrl: 'app/widgets/ptaProvider/ptaProviderTemplate.html',
            link: function (scope, el, attrs) {
                scope.hasError = false;
                dataService.getProvider(scope.item.widgetSettings.id)
                    .then(function (data) {
                        scope.selectedProvider = data;
                    });
            }
        };
    }]);
})();