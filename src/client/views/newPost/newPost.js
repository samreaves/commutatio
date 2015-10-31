'use strict';

// Declare app level module which depends on views, and components
angular.module('commutatio.posts', ['ngRoute'])

// Configure root to use the posts partial and PostsCtrl controller
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/posts/posts.html',
    controller: 'PostsCtrl'
  });
}])

// Set up EncryptionCtrl controller
.controller("PostsCtrl", ["$scope", "postAPI", function($scope, postAPI) {

  // Send service call for posts
  postAPI.getAllPosts().then(function(posts) {

    // Assign view's posts to result of service call
    $scope.posts = posts;
  });

}]);