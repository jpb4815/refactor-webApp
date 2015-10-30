// Excercise dictionary directive
(function() {
    "use strict";

    angular.module('app').directive('ptaExcerciseDictionary', [function () {
        return {
            scope: {
            },
            templateUrl: "app/provider/excerciseDictionaryTemplate.html"
        }
    }]);
})