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
    run_sequence('clean','copy', 'compile');
});


/**
 * @name htmlwatch
 * @desc Watches client html files and copies them to build directory when saved changes are detected.
 */
gulp.task('htmlwatch', function() {

    gulp.watch('src/client/**/*.html', ['copy']);
});


/**
 * @name clientjswatch
 * @desc Watches client js files and copies them to build directory when saved changes are detected.
 */
gulp.task('clientjswatch', function() {

    gulp.watch('src/client/**/*.js', ['copy']);
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
gulp.task('watch', ['htmlwatch', 'clientjswatch', 'scsswatch', 'serverwatch']);



/**
 * @name serve
 * @desc The app serve task - starts the server for the app
 */
gulp.task('serve', function() {

    // Start our own server
    server.start();

});

/**
 * @name dev
 * @desc The develop task - serve the app and watch for file updates
 */
gulp.task('dev', ['serve', 'watch']);




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
 * @desc Lint scss
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
 * @desc The test task - Runs all tests
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