angular.module('app')
    .service('CopyService', function($http) {
        return {

            createCopy: function(gif,userId,urlLink){
              return $http.post('/copy',{gifId: gif, user: userId, url: urlLink});
            },
            getAll: function() {
                return $http.get('/copy');
            },
            getOne: function(id) {
                return $http.get('/copy/' + id);
            },
            copyUpdate: function(id, gif,url) {
                console.log(id, gif);
                return $http.put('/copy/'+ id ,{gifId: gif, url: url});
            },
            update: function(id, user) {
                return $http.put('/copy/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/copy/' + id);
            }
        };
    });
