'use strict';

console.log("Hello World");

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
            .when('/books', {
                templateUrl : 'views/books.html',
                controller  : 'bookController'
            })
            .when('/add_book', {
                templateUrl : 'views/add_book.html',
                controller  : 'bookController'
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
//  REST API -- CHARACTERS
// -----------------------------------------------------------------------------

$http({
  method: 'GET',
  url: 'http://localhost:3030/characters'
}).then(function successCallback(response) {
       console.log(response.status, "GET CHARACTERS: " + response.statusText);
    $scope.characters = response.data;
  }, function errorCallback(response) {
      console.error(response.status, response.statusText);
  });

$scope.submitCharacter = function() {
    var data = $scope.character;  
    $http.post('http://localhost:3030/characters', data).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    $location.path('/');
    }

$scope.changeCharacter = function() {
    var data = $scope.factory.selection;
    console.log(data);
    $http.put('http://localhost:3030/characters', data).
        success(function(data) {
                console.log(data);
            console.log("put successfully");
        }).error(function(data) {
                console.log(data);
            console.error("error in putting");
        })

    $location.path('/');

    }

    $scope.deleteCharacter = function(id) {
        var data = { _id : id };  
        $http.post('http://localhost:3030/delete_character', data).
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
        $http.post('http://localhost:3030/view_character', viewselected)
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
        $http.post('http://localhost:3030/edit_character', editselected)
            .success(function(data) { 
                console.log("POST found the right Character");
                $scope.factory.selection = data;
                console.log(data);
            })
            .error(function(data) {
                console.error("POST encountered an error");
            })
                $location.path('/edit_character'); 
        } 


}]);

ensembleApp.controller('bookController', ['$scope','$http','$location', function ($scope, $http, $location) {

    
// -----------------------------------------------------------------------------  
//  REST API -- BOOKS
// -----------------------------------------------------------------------------

$http({
  method: 'GET',
  url: 'http://localhost:3030/books'
}).then(function successCallback(response) {
       console.log(response.status, "GET BOOKS: " + response.statusText);
    $scope.books = response.data;
  }, function errorCallback(response) {
      console.error(response.status, response.statusText);
  });

$scope.submitBook = function() {
    var data = $scope.book;  
    $http.post('http://localhost:3030/books', data).
        success(function(data) {
            console.log("Book posted successfully");
        }).error(function(data) {
            console.error("error in posting Book");
        })
    $location.path('/books');
    }
    
    $scope.deleteBook = function(id) {
        var data = { _id : id };  
        $http.post('http://localhost:3030/delete_book', data).
        success(function(data) {
            console.log(data)
            console.log("Book deleted successfully");
        }).error(function(data) {
            console.error("error in deleting Book");
        })
    $location.path('/books');
    }     
}]);
