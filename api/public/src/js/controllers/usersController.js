angular
  .module('asteroidsApp')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser', '$state', '$stateParams', '$http'];
function UsersController(User, CurrentUser, $state, $stateParams, $http){
  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;

  // self.getAsteroids  = getAsteroids;

  // function getAsteroids() {
  //   $http
  //     .get("https://api.nasa.gov/neo/rest/v1/feed?start_date=2016-05-30&end_date=2016-06-06&api_key=JO1yEF6ccMIYKvXOjCEmActpFwBIeSswDJErkJbX")
  //     .then(function(response) {
  //       console.log(response);
  //       self.asteroids = response.data.near_earth_objects
  //     });
  // }

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.currentUser = CurrentUser.getUser();
      self.getUsers();
      $state.go('home');
    }
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    self.all         = [];
    self.currentUser = null;
    CurrentUser.clearUser();
  }

   function checkLoggedIn() {
     self.currentUser = CurrentUser.getUser();
     return !!self.currentUser;
   }

   if (checkLoggedIn()) {
     self.getUsers();
   }

   // getAsteroids();

   return self;
 }