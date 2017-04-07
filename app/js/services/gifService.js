angular.module('app')
    .service('GifService', function($http) {
        return {
            getAll: function() {
                return $http.get('http://api.giphy.com/v1/gifs/search?q=sexy+girl&api_key=dc6zaTOxFJmzC');
            },
            getX: function(n) {
                return $http.get('http://api.giphy.com/v1/gifs/search?q=sexy+girl&api_key=dc6zaTOxFJmzC&limit=' + n);
            },
            getOne: function(id) {
                return $http.get('http://api.giphy.com/v1/gifs/search?q=' + id +'&api_key=dc6zaTOxFJmzC');
            },
            getSearch : function(search){
                return $http.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC&limit=100');
            },
            getLucky: function() {
                return $http.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC');
            },
            update: function(id, user) {
                return $http.put('http://api.giphy.com/v1/gifs/search?q=sexy+girl&api_key=dc6zaTOxFJmzC' + id, user);
            },
            delete: function(id) {
                return $http.delete('http://api.giphy.com/v1/gifs/search?q=sexy+girl&api_key=dc6zaTOxFJmzC' + id);
            }
        };
    });
