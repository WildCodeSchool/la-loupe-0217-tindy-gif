angular.module('app')
  .service('VoteService', function($http, $sce) {
    return {
      getUser: function(id, userId) {
        return $http.get('/gifs/vote', {
          params: {
            gif: id,
            user: userId
          }
        });
      },

      getGif: function(id, url, urlSmall) {
        return $http.get('/gifs/gif', {
          params: {
            gif: id,
            url: url,
            urlSmall: urlSmall
          }
        });
      },
      getOne: function(id) {
        return $http.get('/gifs/one/' + id);
      },

      getAll: function() {
        return $http.get('/gifs/all');
      },
      createGif: function(gif) {
        return $http.post('/gifs/', gif);

      },
      updateLike: function(id, userId) {
        return $http.put('/gifs/like/' + id, {
          user: userId
        });
      },

      updateDislike: function(id, userId) {
        return $http.put('/gifs/dislike/' + id, {
          user: userId
        });
      },

      delete: function(id) {
        return $http.delete('/users/' + id);
      }
    };
  });
