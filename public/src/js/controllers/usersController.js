angular
  .module('asteroidsApp')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser', '$state', '$stateParams', '$http', '$uibModal', '$uibModalStack'];
function UsersController(User, CurrentUser, $state, $stateParams, $http, $uibModal, $uibModalStack){
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
  self.open          = open;
  self.close         = close;
  
  function open(form){

    self.modalInstance = $uibModal.open({
      animation: true,
      templateUrl: "/src/js/views/authentications/"+form+".html",
      size: 'lg',
      controller: "UsersController",
      controllerAs: "users"
    });
    // self.modalInstance = $uibModal.open({
    //   animation: true,
    //   templateUrl: "/src/js/views/authentications/register.html",
    //   size: 'sm',
    //   controller: "UsersController",
    //   controllerAs: "users"
    // });

    self.modalInstance.result.then(function(selectedItem){
      self.selected = selectedItem;}, function(){
        console.log('Modal here');
      }
    );

  }

  function close(){
    $uibModalStack.dismissAll();
  }

  //********* Users *******//

  function getUsers() {
    console.log("getting users???");
    User.query(function(data){
      console.log(data);
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

