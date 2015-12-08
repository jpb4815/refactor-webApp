(function() {
    'use strict';
    angular.module("commonServices", ['ngResource'])
        .constant("appSettings",
        {
            serverPath: "http://localhost:55928"
        });

})();