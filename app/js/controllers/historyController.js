angular.module('app')
  .controller('HistoryController', function($scope, UserService, CurrentUser, CopyService, GifService, VoteService) {
    userId = CurrentUser.user()._id;
    $scope.email = CurrentUser.user().email;
    $scope.password1 = "";
    $scope.password2 = "";
    $scope.gifs = "";
    $scope.urlModal = "";
    $scope.gifModal = "";


    function compare(a, b) {
      if (a.count < b.count)
        return 1;
      if (a.count > b.count)
        return -1;
      return 0;
    }


    CopyService.getOne(userId).then(function(res) {
      $scope.gifs = res.data.sort(compare);
    });


    $scope.modal = function(id) {
      GifService.getOne($scope.gifs[id].gifId).then(function(res) {
        $scope.urlModal = res.data.data[0].images.downsized.url;
        $scope.gifModal = res.data.data[0].id;
        VoteService.getOne($scope.gifModal).then(function(res) {});
      });
    };


    $scope.success = function(id) {
      CopyService.createCopy($scope.gifs[id].gifId, userId, $scope.gifs[id].url, $scope.gifs[id].urlSmall).then(function(res) {});
    };


    $("#password_confirm").on('keyup', function() {
      if ($(this).val() === $('#password').val()) {
        $("#message").html('matching').css('color', 'green');
      } else {
        $("#message").html('not matching').css('color', 'red');
      }
    });


    $scope.submit = function() {
      if ($scope.password1 == $scope.password2 && $scope.email !== undefined) {
        UserService.update($scope.email, $scope.password2).then(function(res) {});
      }
    };




  });
