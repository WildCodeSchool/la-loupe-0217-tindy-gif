angular.module('app')
    .controller('RankController', function($scope, GifService, VoteService, UserService, CopyService, CurrentUser, $state) {
        var table = [];
        var classe = {};
        var userId = CurrentUser.user()._id;
        $scope.gifs = [];
        $scope.gifId = "";
        $scope.supported = false;
        $scope.urlModal = "";
        $scope.gifModal = "";

        function verif() {
            VoteService.getUser($scope.gifModal, userId).then(function(res) {
                $scope.isVote = function() {
                    if (res.data) {
                        return true;
                    }
                };
            });
        }


        $scope.success = function(id) {
            CopyService.createCopy($scope.gifs[id].gif, userId, $scope.gifs[id].url, $scope.gifs[id].urlSmall).then(function(res) {});
        };


        // $scope.fail = function(err) {};


        VoteService.getAll().then(function(res) {
            var table = res.data;
            for (var i = 0; i < table.length; i++) {
                table[i].class = i + 1;
            }
            $scope.gifs = table;
        });


        $('#myModal').on('shown.bs.modal', function() {
            $('#myInput').focus();
        });

        $scope.modal = function(id) {
            GifService.getOne($scope.gifs[id].gif).then(function(res) {
                $scope.urlModal = res.data.data[0].images.downsized.url;
                $scope.gifModal = res.data.data[0].id;
                VoteService.getOne($scope.gifModal).then(function(res) {
                    $scope.like = res.data.like.length;
                    $scope.dislike = res.data.dislike.length;
                });
                verif();
            });
        };


        $scope.addDislike = function() {
            VoteService.updateDislike($scope.gifModal, userId).then(function(res) {
                $('#myModal').modal('hide');
                window.location.reload(1);
            });
        };


        $scope.addLike = function() {
            VoteService.updateLike($scope.gifModal, userId).then(function(res) {
                $('#myModal').modal('hide');
                window.location.reload(1);
            });
        };

    });
