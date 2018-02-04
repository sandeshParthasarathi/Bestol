(function () {
'use strict';

angular.module('myApp', ['ui.router'])
.controller('UserController', UserController)
.service('UserService', UserService)
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('user', {
      url: '/user',
      templateURL: 'src/commit.html' 
    })

    
}


UserController.$inject = ['UserService'];
function UserController(UserService) {
  var user = this;

   user.userName = "";

   user.getUser = function () {
     console.log(UserService.repo(user.userName));
     var promise = UserService.repo(user.userName);

     promise.then(function (response) {
      user.categories = response.data;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });

      user.getComit = function(){
          var commit = UserService.commit();

          commit.then(function (response) {
          user.commits = response.data;
          })
          .catch(function (error) {
            console.log("Something went terribly wrong.");
          });
       }


   }

}


UserService.$inject = ['$http'];
function UserService($http) {
  var service = this;

  var runUserRequest = function (userName){
    return $http({
      method: "GET",
      url: 'https://api.github.com/users/'+userName+'/repos'
    })

  };

  return {
      repo : function (userName){
        return runUserRequest (userName);
      }
    }


}

})();
