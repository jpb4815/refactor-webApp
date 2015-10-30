// injury dictionary directive
(function() {
    "use strict";

    angular.module('app').directive('ptaInjuryDictionary', [function () {
        return {
            scope: {
            },
            templateUrl: "app/provider/injuryDictionaryTemplate.html"
        }
    }]);
})();