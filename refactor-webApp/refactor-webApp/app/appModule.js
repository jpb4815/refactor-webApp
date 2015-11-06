(function () {
    "use strict";

    angular.module("app", ["ptFramework", "ngRoute", "ngResource", "ngStorage", "ui.bootstrap"])
        .constant("appSettings",
        {
            serverPath: "http://localhost:55928/"
        });
})();