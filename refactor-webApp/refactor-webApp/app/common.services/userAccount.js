(function() {
    "use strict";

    angular.module("commonServices").factory("userAccount", ["$resource", userAccount]);

    function userAccount($resource) {
        return {
            registration: $resource("http://localhost:55928/api/Account/Register", null,
                    {
                        'registerUser': { method: 'POST' }
                    }),
            login: $resource("http://localhost:55928/Token", null,
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