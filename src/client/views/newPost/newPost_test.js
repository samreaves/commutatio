'use strict';


// Test the Test controller (Lane)
describe('Controller: PostsCtrl', function () {
  
  // Before each test, load the Encryption module
  beforeEach(module('commutatio.posts'));

  // Initialize global test variables
  var PostsCtrl, rootScope, scope;
  
  // Before each test, load the controller, rootScope, and $timeout
  beforeEach(

  	inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    
    // Initialize a new scope.
    PostsCtrl = $controller('PostsCtrl', {
      $scope: scope,
    });


  }));
 
   it('should expect Posts Controller to be defined', inject(function () {
    
    // Expect EncryptionCtrl to be defined
    expect(PostsCtrl).toBeDefined();

  }));
});