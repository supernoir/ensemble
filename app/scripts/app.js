'use strict';

var ensembleApp = angular.module('ensembleApp',['ngRoute']);
ensembleApp.controller('mainController', ['$scope','$http','$location', function ($scope, $http, $location) {

$scope.hello = "Hello";

}]);