angular.module('app')
    .controller('HistoryController', function($scope, UserService, CurrentUser, CopyService) {
        id = CurrentUser.user()._id;
        var newCopy = [] ;


        CopyService.getOne(id).then(function(res) {
            console.log(res.data);
            newCopy = res.data;
            $scope.gifs = newCopy;
        });



    });
