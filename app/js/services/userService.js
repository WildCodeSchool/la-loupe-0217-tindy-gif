angular.module('app')
    .service('UserService', function($http) {
        return {
            getAll: function() {
                return $http.get('/users');
            },
            getOne: function(id) {
                return $http.get('/users/' + id);
            },

            update: function(id, password) {
                return $http.put('/users/' + id, {password: password});
            },
            delete: function(id) {
                return $http.delete('/users/' + id);
            }
        };
    });
