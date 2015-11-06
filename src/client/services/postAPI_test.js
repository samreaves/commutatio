'use strict';


// Test the factory
describe('factory: postAPI', function() {
  
  // Initialize global test variables
  var postAPI;
  var timeout;

  // Before each test, load the services module, ValueAPI object, 
  // and $timeout object
  beforeEach(function() {
  	
  	module('commutatio.postAPI');

  	inject(function($injector) {
  		postAPI = $injector.get('postAPI');
	});

	inject(function($timeout) {
		timeout = $timeout;
	})
	

  })

  // Make sure postAPI object is defined
  describe('factory postAPI toBeDefined', function() {
  	it('should be defined', function() {
  		expect(postAPI).toBeDefined();
  	})
  })

  // Make sure postAPI.posts is populated
  describe('property postAPI.posts toBeEqualTo', function() {
  	it('should be equal to', function() {
  		expect(postAPI.posts).toEqual(
                  [
                    {
                      author: "sreaves",
                      category: "soccer",
                      content: "barcelona is the best. they have a vampire with a messi haircut",
                      datetime: "October 30, 2015 12:35pm",
                      id: 1,
                      tags: ["soccer", "fcbarcelona"],
                      title: "barcelona kicks ass",
                      votes: 1
                    },
                    {
                      author: "mlomas",
                      category: "humans",
                      content: "humans that become clowns can't fly",
                      datetime: "October 30, 2015 12:55pm",
                      id: 2,
                      tags: ["humans", "clowns"],
                      title: "clowns don't fly",
                      votes: 1
                    }
                  ]
  			)
  	})
  })

  // Make sure getAllPosts method is defined
  describe('method postAPI.getAllPosts toBeDefined', function() {
  	it('should be defined', function() {
  		expect(postAPI.getAllPosts).toBeDefined();
  	})
  })

  // Make sure getPostById method is defined
  describe('method postAPI.getPostById toBeDefined', function() {
  	it('should be defined', function() {
  		expect(postAPI.getPostById).toBeDefined();
  	})
  })

  // Make sure getPostById method works as planned
  describe('method postAPI.getPostById toEqual', function() {
  	it('should equal', function(){
		  // simulate scope variable
  		var post;
  		
  		// Make the AJAX call
  		postAPI.getPostById(1).then(function(data) {
  			
  			// Simulate the DOM updating
  			post = data;
  		})
  		
  		// Flush timeouts so that the promise resolves
  		timeout.flush();

  		// Expect the DOM's value to have updated
  		expect(post).toEqual({
                      author: "sreaves",
                      category: "soccer",
                      content: "barcelona is the best. they have a vampire with a messi haircut",
                      datetime: "October 30, 2015 12:35pm",
                      id: 1,
                      tags: ["soccer", "fcbarcelona"],
                      title: "barcelona kicks ass",
                      votes: 1
                    })
  	})
  })

  // Make sure getAllPosts method works as planned
  describe('method postAPI.getAllPosts toEqual', function() {
    it('should equal', function(){
      // simulate scope variable
      var posts;
      
      // Make the AJAX call
      postAPI.getAllPosts().then(function(data) {
        
        // Simulate the DOM updating
        posts = data;
      })
      
      // Flush timeouts so that the promise resolves
      timeout.flush();

      // Expect the DOM's value to have updated
      expect(posts).toEqual([
                    {
                      author: "sreaves",
                      category: "soccer",
                      content: "barcelona is the best. they have a vampire with a messi haircut",
                      datetime: "October 30, 2015 12:35pm",
                      id: 1,
                      tags: ["soccer", "fcbarcelona"],
                      title: "barcelona kicks ass",
                      votes: 1
                    },
                    {
                      author: "mlomas",
                      category: "humans",
                      content: "humans that become clowns can't fly",
                      datetime: "October 30, 2015 12:55pm",
                      id: 2,
                      tags: ["humans", "clowns"],
                      title: "clowns don't fly",
                      votes: 1
                    }
                  ])
    })
  })
});