(function () {
    "use strict";

   //Login functionality
    angular.module('app').controller('appController',
    ['$scope', 'ptaResource',

        function ($scope, ptaResource) {
            $scope.state = 'unauthorized';
            $scope.userData = {
                userName: "",
                email: "",
                password: "",
                confirmPassword: ""
            };
            $scope.message = "";
            $scope.isRegister = false;

            //sign in the user, this is a simple bit flip for now
            $scope.signIn = function () {
                $scope.state = 'authorized';

            };

            //toggle show and hide of the register user screen
            $scope.register = function() {
                $scope.isRegister = !$scope.isRegister;
            }

            //register the user with the auth service
            $scope.registerUser = function () {
                $scope.userData.confirmPassword = $scope.userData.password;
                $http.post("http://localhost:55928/api/Account/Register")
                    .then(function (data) {
                        //success
                        $scope.confirmPassword = "";
                            $scope.message = ".... Registration Succesful";
                        $scope.state = "authorized";
                            $scope.signIn();
                        },
                        function (resp) {
                            //error
                            $scope.message = resp.statusText + "\r\n";
                            if (resp.data.exceptionMessage) {
                                $scope.message = resp.data.modelState[key] + "\r\n";
                            }
                        });
            }
        }
    ]);
})();