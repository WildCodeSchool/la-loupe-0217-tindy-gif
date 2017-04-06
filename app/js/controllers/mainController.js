angular.module('app')
    .controller('MainController', function($scope, $state, GifService, VoteService, $location, CopyService, CurrentUser) {

        var n = 0;
        var userId = CurrentUser.user()._id;
        $scope.gifId = "";
        $scope.getSearch = [];
        $scope.lucky = [];
        $scope.search = {
            saisie: ""
        };
        $scope.modalShown = false;


        function verif() {
            VoteService.getUser($scope.gifId, userId).then(function(res) {
                $scope.isVote = function() {
                    if (res.data) {
                        return true;
                    }
                };
            });
        }


        function randomGif() {
            GifService.getLucky().then(function(res) {

                $scope.lucky = res.data.data.image_url;
                $scope.gifId = res.data.data.id;
                $scope.smallUrl = res.data.data.fixed_width_small_url;
                VoteService.getGif($scope.gifId,$scope.lucky, $scope.smallUrl).then(function(res) {
                    verif();
                });
            });
        }


        $scope.toNext = function() {
            randomGif();
        };


        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };


        $scope.loupe = function() {
            $scope.modalShown = !$scope.modalShown;
        };


        $scope.launchSearch = function() {
            var saisie = $scope.search.saisie;
            if (saisie !== undefined) {
                $state.go('user.search', {
                    query: saisie
                });
            }
        };


        $scope.goSearch = function() {
            search = $scope.search.saisie;
            GifService.getSearch(search).then(function(res) {
                var i = Math.floor(Math.random(0, 101) * 100);
                $scope.getSearch = res.data.data[i];
                $scope.gifId = res.data.data[i].id;
            });
        };


        $scope.copy = function() {
            CopyService.createCopy($scope.gifId, userId,$scope.lucky, $scope.smallUrl).then(function(res) {
                console.log(res);
            });
            var toCopy = document.getElementById('to-copy'),
                btnCopy = document.getElementById('copy');
            toCopy.select();
            document.execCommand('copy');
            return false;

        };


        $scope.addDislike = function() {
            VoteService.updateDislike($scope.gifId, userId).then(function(res) {
                randomGif();
            });
        };

        $scope.addLike = function() {
            VoteService.updateLike($scope.gifId, userId).then(function(res) {
                randomGif();
            });
        };

        randomGif();

    });
