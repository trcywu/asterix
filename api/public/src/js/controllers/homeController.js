angular
  .module('asteroidsApp')
  .controller('HomeController', HomeController);

HomeController.$inject = [];
function HomeController(){

  // ******** instantiate particles.js ******** //

  // window.particlesJS.load('div-id', 'path/to/particles.json', function() {
  //   console.log("Particles loaded");
  // });


  particlesJS.load('particles-js', '/particles.json', function() {
     console.log('callback - particles.js config loaded');
   });

  // var stats = new Stats();
  // stats.setMode(0);
  // stats.domElement.style.position = 'absolute';
  // stats.domElement.style.left = '0px';
  // stats.domElement.style.top = '0px';
  // document.body.appendChild(stats.domElement);
  // var count_particles = document.querySelector('.js-count-particles');
  // var update = function(){
  //   stats.begin();

  //   stats.end();
  //   if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
  //     count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  //   }
  //   requestAnimationFrame(update);
  // };
  // requestAnimationFrame(update);

}