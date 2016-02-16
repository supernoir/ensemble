'use strict';


// -----------------------------------------------------------------------------  
//  APP SETUP
// -----------------------------------------------------------------------------

var ensembleApp = angular.module('ensembleApp',['ngRoute']);

// -----------------------------------------------------------------------------  
//  ROUTING
// -----------------------------------------------------------------------------


    ensembleApp.config(function($locationProvider, $routeProvider, $httpProvider) {
        $routeProvider

            .when('/', {
                templateUrl : 'views/home.html',
                controller  : 'mainController'
            })

            .when('/view_character', {
                templateUrl : 'views/view_character.html',
                controller  : 'mainController'
 
            });
            $locationProvider.html5Mode(false);
    });

ensembleApp.controller('mainController', ['$scope','$http','$location', function ($scope, $http, $location) {


// -----------------------------------------------------------------------------  
//  REST API
// -----------------------------------------------------------------------------

$http({
  method: 'GET',
  url: 'http://localhost:8080/characters'
}).then(function successCallback(response) {
       console.log(response.status, "GET CHARACTERS: " + response.statusText);
    $scope.characters = response.data;
  }, function errorCallback(response) {
      console.error(response.status, response.statusText);
  });


}]);