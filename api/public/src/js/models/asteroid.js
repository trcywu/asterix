angular
 .module("asteroidsApp")
 .factory('Asteroid', Asteroid);

 Asteroid.$inject = ['$http', 'DateService', 'NASA_KEY'];
 function Asteroid($http, DateService, NASA_KEY){

  return {
    query: function(callback){
      var start_date = DateService.getDate(0);
      var end_date = DateService.getDate(7);
      return $http({
        method: "GET",
        url: "https://api.nasa.gov/neo/rest/v1/feed",
        params: {
          start_date: start_date,
          end_date: end_date,
          api_key: NASA_KEY
        }
      }).then(function(response) {
        callback(response);
      });
      
    }
  };

 }