'use strict';


// -----------------------------------------------------------------------------  
//  APP SETUP
// -----------------------------------------------------------------------------

var ensembleApp = angular.module("ensembleApp",["ngRoute"]);

// -----------------------------------------------------------------------------  
//  CHARACTER FACTORY
// -----------------------------------------------------------------------------

    ensembleApp.factory('characterFactory',function() {
        return {
        };
    });  

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
            .when('/edit_character', {
                templateUrl : 'views/edit_character.html',
                controller  : 'mainController'
            })
            .when('/view_character', {
                templateUrl : 'views/view_character.html',
                controller  : 'mainController'
 
            });
            $locationProvider.html5Mode(false);
    });

ensembleApp.controller('mainController', ['$scope','$http','$location','characterFactory', function ($scope, $http, $location, characterFactory) {

$scope.factory = characterFactory;

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

$scope.changeCharacter = function() {
    var data = $scope.factory.selection;
    console.log("here's your " + data);
    $http.put('http://localhost:3000/characters', data).
        success(function(data) {
            console.log(data);
            console.log("put successfully");
        }).error(function(data) {
            console.error("error in putting");
        })
    $location.path('/');
    }

    $scope.deleteCharacter = function(id) {
        var data = { _id : id };  
        $http.post('http://localhost:3000/delete_character', data).
        success(function(data) {
            console.log(data)
            console.log("deleted successfully");
        }).error(function(data) {
            console.error("error in deleting");
        })
    $location.path('/');
    }

  $scope.viewCharacterbyId = function(id) {
        var viewselected = { _id : id };
        $http.post('http://localhost:3000/view_character', viewselected)
            .success(function(data) {
                console.log("POST found the right Character");
                $scope.factory.selection = data;
                console.log($scope.factory.selection);
            })
            .error(function(data) {
                console.error("POST encountered an error");
            })
                $location.path('/view_character'); 
        } 

  $scope.editCharacterbyId = function(id) {
        var editselected = { _id : id };
        $http.post('http://localhost:3000/edit_character', editselected)
            .success(function(data) {
                console.log("POST found the right Character");
                $scope.factory.selection = data;
                console.log($scope.factory.selection);
            })
            .error(function(data) {
                console.error("POST encountered an error");
            })
                $location.path('/edit_character'); 
        } 

}]);