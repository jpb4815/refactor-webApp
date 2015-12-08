(function () {
    "use strict";
    //using decorator pattern here to display errors to the user
    angular.module('app').config(function ($provide) {
        $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
            return function (exception, cause) {
                $delegate(exception, cause);
                alert(exception.message);
            };
        }]);
    });
})();