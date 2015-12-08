(function() {
    "use strict";
    angular
        .module("commonServices")
        .factory("ptaResource", ["$resource", "appSettings", ptaResource]);

    //factory method for the login functionality of the application
    function ptaResource($resource, appSettings) {
    
        return {
            registration: $resource(appSettings.serverPath + "/api/Account/Register", null,
                    {
                        'registerUser': { method: 'POST' }
                    }),
            //log user in adding the bearer token to the headers so that we can hit locked down views
            login: $resource(appSettings.serverPath + "/Token", null,
                    {
                        'loginUser': {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            transformRequest: function (data, headersGetter) {
                                var str = [];
                                for (var d in data)
                                    str.push(encodeURIComponent(d) + "=" +
                                                        encodeURIComponent(data[d]));
                                return str.join("&");
                            }

                        }
                    })
        }

    }
})();
