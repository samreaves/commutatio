/**
 * @file gulpfile.js
 * @name Gulpfile
 * @author Sam Reaves <thesamreaves@gmail.com>
 *
 * @desc Development tasks configuration.
 *
 * - App launch
 * - Source compilation
 * - Testing
 * - Documentation generation
 *
 */

var gulp = require('gulp');
var gls = require('gulp-live-server');
var run_sequence = require('run-sequence');
var sass = require('gulp-sass');
var sass_sourcemaps = require('gulp-sourcemaps')
var clean = require('gulp-clean');
var server = gls.new('dist/server/app.js');

/**
 * @name default
 * @desc The default task - build the project and serve it up
 */
gulp.task('default', ['build', 'serve']);

/**
 * @name clean
 * @desc The dist/ cleanup task - Removes all files and folders from the build directory
 */
gulp.task('clean', function() {

    // Clean dist folder
    return gulp.src(['dist', 'dist/*'], {read: false})
        .pipe(clean());
});

/**
 * @name copy
 * @desc The copy task - some files don't need to be compiled and moved over to dist, they just
 * need to be straight up copied over to dist without any processing.
 */
gulp.task('copy', function() {

    /*
    * Client-side static files
    */
    gulp.src(['src/client/**', '!src/client/assets/{sass,sass/**,css/**}'])
        .pipe(gulp.dest('dist/client'));

    /*
     * Server-side static files
     */
    gulp.src('src/server/**/*')
        .pipe(gulp.dest('dist/server'));
});

/**
* @name scss
* @desc The scss compilation task - converts all SCSS to CSS
*/
gulp.task('scss', function() {
    gulp.src('src/client/assets/sass/main.scss')
        .pipe(sass_sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sass_sourcemaps.write())
        .pipe(gulp.dest('dist/client/assets/css'));
});


/**
 * @name compile
 * @desc Compile sass to css. Later, potentially ES6 JS
 */
gulp.task('compile', ['scss']);


/**
 * @name build
 * @desc The build task - clears out the dist folder, compiles everything & bundles it
 */
gulp.task('build', function() {
    run_sequence('clean', ['copy', 'compile']);
});

/**
 * @name staticwatch
 * @desc Watches static files and copies them to build directory when saved changes are detected.
 */
gulp.task('staticwatch', function() {

    gulp.watch('src/client/**/*', ['copy']);
});


/**
* @name scsswatch
* @desc Watches SCSS files and compiles them into build directory when saved changes are detected.
*/
gulp.task('scsswatch', function() {

    //compile all SCSS when any SCSS files change
    gulp.watch('src/client/**/*.scss', ['scss']);
});

/**
* @name serverwatch
* @desc Watches server files and compiles them into build directory when saved changes are detected.
*/
gulp.task('serverwatch', function() {

    //compile all SCSS when any SCSS files change
    gulp.watch('src/server/**/*.js', ['copy']);
});

/**
 * @name watch
 * @desc The watch task - watches for changes to source files and triggers appropriate compile tasks.
 */
gulp.task('watch', ['staticwatch', 'scsswatch', 'serverwatch']);

/**
 * @name livereload
 * @desc Reloads the page in browser when a saved change is detected.
 */
gulp.task('livereload', function() {
    server.notify.apply(server, arguments);
});

/**
 * @name serve
 * @desc The app serve task - starts the server for the app
 * Also live reloads the page in the browser after source files are compiled.
 */
gulp.task('serve', function() {

    // Start our own server
    server.start();

    // Enable live reloading by watching for trigger filetypes (html, css, js, etc) and notifying the server
    gulp.watch(['dist/client/**/*.html', 'dist/client/**/*.css', 'dist/client/**/*.js', 'dist/server/**/*.js'], ['livereload']);

});

/**
 * @name develop
 * @desc The develop task - serve the app and watch for file updates
 */
gulp.task('develop', ['serve', 'watch']);

/**
 * @name eslint
 * @desc The eslint task - Runs eslint using specified rules.
 */
// gulp.task('eslint', function() {
//     var eslintOptions = {
//         configFile: 'config/eslint/.eslintrc',
//         rulePaths: ['config/eslint/custom_rules'],
//         envs: [
//             'browser',
//             'node'
//         ]
//     };

//     return gulp.src(['src/**/*.js'])
//         .pipe(eslint(eslintOptions))
//         .pipe(eslint.format())
//         .pipe(eslint.failOnError());
// });

/**
 * @name scsslint
 * @desc The lint task - runs both eslint and scsslint tasks
 */
// gulp.task('scsslint', function() {
//     gulp.src('src/**/*.scss')
//         .pipe(scsslint());
// });

/**
 * @name lint
 * @desc The lint task - Runs eslint and scsslint tasks.
 */
//gulp.task('lint', ['eslint', 'scsslint']);

/**
 * @name test
 * @desc The test task - Runs all jest tests
 */
//gulp.task('test', function() {
//
//});

/**
 * @name doc
 * @desc The doc task - Generates documentation from specified source files.
 * Uses JSDOC syntax parsed from the source files to generate stylized documentation.
 */
//gulp.task('doc', function() {
//
//});