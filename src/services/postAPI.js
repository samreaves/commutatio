angular.module('commutatio.postAPI', [])
        
        .factory('postAPI', ["$q", "$timeout", function($q, $timeout) {

                // Initialization of the object
                var postAPI = {};

                // Simulated JSON Responses

                // All posts
                postAPI.posts = [
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




                /**
                 * @author  Sam Reaves
                 * @date October 30th, 2015
                 * 
                 * @name  getAllPosts
                 * @description Sends AJAX call to server for all available posts
                 * 
                 * @returns {array} Array of Posts
                 * 
                 */
                postAPI.getAllPosts = function() {

                    // Create promise to return to view
                    var deferred = $q.defer();

                    // Simulate AJAX
                    $timeout(function() {
                        
                        // Set response to all posts
                        deferred.resolve(postAPI.posts);

                        // 2 seconds until return
                    }, 1500);
                    
                    // Return promise to view
                    return deferred.promise;
                };


                /**
                 * @author  Sam Reaves
                 * @date October 30th, 2015
                 * 
                 * @name  getPostById
                 * @description Sends AJAX call to server for post with id sent as parameter
                 *
                 * @param {integer} id id of post to be received
                 * @returns {array} Array of Posts
                 * 
                 */

                postAPI.getPostById = function(id) {

                    // Create promise to return to view
                    var deferred = $q.defer();

                    // Simulate AJAX
                    $timeout(function() {

                        // For each post
                        postAPI.posts.forEach(function(post) {
                            
                            // If post id matches id requested
                            if (post.id === id) {

                                // Set response to post with ID
                                deferred.resolve(post);
                            }
                        })

                        // No post with that ID found. Reject promise
                        deferred.reject("Post not found with id", id);

                        // 2 seconds until return
                    }, 1500);
                    
                    // Return promise to view
                    return deferred.promise;
                }


                // Return API object
                return postAPI;
            }]);