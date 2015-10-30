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

  $scope.posts = [
    {
      author: "sreaves",
      category: "soccer",
      content: "barcelona is the best. they have a vampire with a messi haircut",
      datetime: "October 30, 2015 12:35pm",
      tags: ["soccer", "fcbarcelona"],
      title: "barcelona kicks ass",
      votes: 1
    },
    {
      author: "mlomas",
      category: "humans",
      content: "humans that become clowns can't fly",
      datetime: "October 30, 2015 12:55pm",
      tags: ["humans", "clowns"],
      title: "clowns don't fly",
      votes: 1
    }
  ]

});