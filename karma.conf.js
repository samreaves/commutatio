module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'src/client/bower_components/angular/angular.js',
      'src/client/bower_components/angular-route/angular-route.js',
      'src/client/bower_components/angular-mocks/angular-mocks.js',
      'src/client/views/**/*.js',
      'src/client/services/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};