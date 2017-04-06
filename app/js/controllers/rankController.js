angular.module('app')
    .controller('RankController', function($scope, GifService, VoteService, UserService, CopyService, CurrentUser) {
        var table = [];
        var classe = {};
        $scope.gifs = [];
        var userId = CurrentUser.user()._id;
        $scope.gifId = "";


        $scope.supported = false;
        $scope.success = function() {
            console.log('Copied!');
            // CopyService.createCopy($scope.gifId, userId, $scope.smallUrl).then(function(res) {
            //     console.log(res);
            // });
        };

        $scope.fail = function(err) {
            console.error('Error!', err);
        };


        // $scope.copy = function(url) {
        //     CopyService.createCopy($scope.gifId, userId, $scope.smallUrl).then(function(res) {
        //         console.log(res);
        //     });
        // var toCopy = document.getElementById('to-copy');
        // var btnCopy = document.getElementById('copy');
        // toCopy.select();
        // console.log(url);
        // document.execCommand('copy', true, url);
        //     document.execCommand('copy', true, url);
        //     return false;
        // };

        VoteService.getAll().then(function(res) {
            var table = res.data;
            for (var i = 0; i < table.length; i++) {
                $scope.gifs = {
                    class: i + 1
                };
            }
            console.log(table);
            $scope.gifs = table;
        });

    });
