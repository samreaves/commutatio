'use strict';

// Declare app level module which depends on views, and components
angular.module('commutatio.posts', ['ngRoute'])

// Configure root to use the encryption partial and EncryptionCtrl controller
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/posts/posts.html',
    controller: 'PostsCtrl'
  });
}])

// Set up EncryptionCtrl controller
.controller("PostsCtrl", function($scope) {

  
});