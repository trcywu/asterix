angular
  .module('asteroidsApp')
  .controller('HomeController', HomeController);

HomeController.$inject = ['Asteroid'];
function HomeController(Asteroid){

  var self       = this;
  self.asteroids = []; 
  self.selectAsteroid = selectAsteroid;
  self.selectedAsteroid = {};

  function selectAsteroid(details){
    self.selectedAsteroid = details;


  }

  self.getName = function(name){
    return name.replace(/[{()}]/g, '').split(" ")[1];
  };

  particlesJS.load('particles-js', '/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

  Asteroid.query(function(response) {
    self.all = response.data.near_earth_objects;

    angular.forEach(self.all, function(value, key) {
      angular.forEach(value, function(details, key) {

        self.asteroids.push(details);

        // angular.forEach(details.close_approach_data, function(orbit_info, key) {
          
        // });
      });
    });

  });

}