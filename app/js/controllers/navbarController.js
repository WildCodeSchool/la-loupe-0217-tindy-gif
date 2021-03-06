angular.module('app')
    .controller('NavbarController', function($scope, Auth, CurrentUser, $state) {
        $scope.isCollapsed = true;
        $scope.auth = Auth;
        $scope.user = CurrentUser.user();

        $scope.logout = function() {
            Auth.logout();
            $state.go('anon.login')
        };
    });
