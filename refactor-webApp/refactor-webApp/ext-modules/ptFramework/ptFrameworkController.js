(function () {
    "use strict";

    angular.module("ptFramework").controller("ptFrameworkController",
    ['$scope', '$window', '$timeout', '$rootScope', '$location',
        function ($scope, $window, $timeout, $rootScope, $location) {
            
            $scope.isMenuVisible = true;
            $scope.isMenuButtonVisible = true;
            $scope.isMenuVertical = true;

            $scope.$on('pt-menu-item-selected-event', function (evt, data) {
                $scope.routeString = data.route;

                $location.path(data.route);
                //lets go ahead and remove the history item
                $location.replace();
                checkWidth();
                broadcastMenuState();
            });

            $scope.$on('pt-menu-orientation-changed-event', function (evt, data) {
                $scope.isMenuVertical = data.isMenuVertical;
                $timeout(function () {
                    $($window).trigger('resize');
                }, 0);
            });

            $($window).on('resize.ptFramework', function () {
                $scope.$apply(function () {
                    checkWidth();
                    broadcastMenuState();
                });
            });
            $scope.$on("$destroy", function () {
                $($window).off("resize.ptFramework"); // remove the handler added earlier
            });

            var checkWidth = function () {
                var width = Math.max($($window).width(), $window.innerWidth);
                $scope.isMenuVisible = (width >= 768);
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            };

            $scope.menuButtonClicked = function () {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuState();

            };

            var broadcastMenuState = function () {
                $rootScope.$broadcast('pt-menu-show',
                    {
                        show: $scope.isMenuVisible,
                        isVertical: $scope.isMenuVertical,
                        allowHorizontalToggle: !$scope.isMenuButtonVisible
                    });
            };

            $timeout(function () {
                checkWidth();
            }, 0);
            
        }
    ]);
})();