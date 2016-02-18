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
            .when('/add_character', {
                templateUrl : 'views/add_character.html',
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
  url: 'http://localhost:3000/characters'
}).then(function successCallback(response) {
       console.log(response.status, "GET CHARACTERS: " + response.statusText);
    $scope.characters = response.data;
  }, function errorCallback(response) {
      console.error(response.status, response.statusText);
  });

$scope.submitCharacter = function() {
    var data = $scope.character;  

    $http.post('http://localhost:3000/characters', data).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    $location.path('/');
    }

}]);