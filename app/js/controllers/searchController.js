angular.module('app')
    .controller('SearchController', function($scope, $state, GifService, $stateParams, VoteService, CurrentUser, UserService, CopyService) {

        var n = 0;
        var userId = CurrentUser.user()._id;
        $scope.gifId = "";
        $scope.gifUrl = "";
        $scope.smallUrl = "";
        $scope.theme = $stateParams.query;
        $scope.alert = "";
        $scope.getSearch = [];
        $scope.lucky = [];
        $scope.modalShown = false;
        $scope.search = {
            saisie: ""
        };


        function verif() {
            VoteService.getUser($scope.gifId, userId).then(function(res) {
                $scope.isVote = function() {
                    if (res.data) {
                        return true;
                    }
                };
            });
        }


        function themeGif() {
            GifService.getSearch($stateParams.query).then(function(res) {
                var i = Math.floor(Math.random(0, res.data.data.length) * 100);
                $scope.getSearch = res.data.data[i];
                $scope.smallUrl = res.data.data[i].images.downsized_medium.url;
                $scope.gifUrl = res.data.data[i].images.downsized.url;
                $scope.gifId = res.data.data[i].id;
                VoteService.getGif($scope.gifId, $scope.gifUrl, $scope.smallUrl).then(function(res) {});
                verif();
            });
        }


        $scope.toNext = function() {
            themeGif();
        };


        $scope.loupe = function() {
            $scope.modalShown = !$scope.modalShown;
        };


        $scope.goSearch = function() {
            search = $scope.search.saisie;
            themeGif();
        };


        $scope.launchSearch = function() {
            var saisie = $scope.search.saisie;
            if (saisie !== undefined) {
                $state.go('user.search', {
                    query: saisie
                });
            }
        };


        $scope.success = function() {
            CopyService.createCopy($scope.gifId, userId, $scope.gifUrl, $scope.smallUrl).then(function(res) {});
        };


        $scope.addDislike = function() {
            VoteService.updateDislike($scope.gifId, userId).then(function(res) {});
            themeGif();
        };


        $scope.addLike = function() {
            VoteService.updateLike($scope.gifId, userId).then(function(res) {});
            themeGif();
        };


        themeGif();
    });
