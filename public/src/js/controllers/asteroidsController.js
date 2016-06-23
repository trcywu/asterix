angular
 .module('asteroidsApp')
 .controller('AsteroidsController', AsteroidsController);


 AsteroidsController.$inject = ['Asteroid'];
 function AsteroidsController(Asteroid){

  var self = this;

  Asteroid.query(function(response) {
    self.data = response.data;
  });

 }
