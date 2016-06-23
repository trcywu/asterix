angular
  .module('asteroidsApp', ['ngResource', 'angular-jwt', 'ui.router', 'ui.bootstrap'])
  .constant('API', 'http://localhost:3000/api')
  .constant('NASA_KEY', 'JO1yEF6ccMIYKvXOjCEmActpFwBIeSswDJErkJbX')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/src/js/views/home.html",
      controller: "HomeController",
      controllerAs: "home"
    })
    .state('asteroids', {
      url: "/asteroids",
      templateUrl: "/src/js/views/asteroids/index.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "/src/js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "/src/js/views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "/src/js/views/users/index.html"
    })
    .state('user', {
      url: "/user/:id",
      templateUrl: "/src/js/views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    });

  $urlRouterProvider.otherwise("/");
}

