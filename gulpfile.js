// ##### Gulp Toolkit #####

// ***** Inspired by https://css-tricks.com/gulp-for-beginners/ ***** //

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var del = require('del');
var modernizr = require('gulp-modernizr');
var runSequence = require('run-sequence');
var validateHTML = require('gulp-w3cjs');
var jshint = require('gulp-jshint');
var lbInclude = require('gulp-lb-include');
var ssi = require('browsersync-ssi');
var sftp = require('gulp-sftp');
var postcss = require('gulp-postcss');
var assets = require('postcss-assets');
var ghPages = require('gulp-gh-pages');


// ***** Plugins That Run a Single Process ***** //

// Run these processes from the command line using the task name. Example: $ gulp hello 


// Check that gulp is working:
gulp.task('hello', function() {
  console.log('Gulp is installed and running correctly.');
});


// Run the dev process 'gulp':
gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})


// Run the build process 'build':
gulp.task('build', function (callback) {
  runSequence('clean', 
    ['js-lint', 'sass', 'useref', 'copy-images'],
    callback
  )
})


// Minify all images during development:
gulp.task('minify-images', function(){
  return gulp.src('app/images/**')
  .pipe(imagemin())
  .pipe(gulp.dest('app/images'))
});


// Run 'gulp modernizr' to build a custom modernizr file based off of classes found in CSS:
gulp.task('modernizr', function() {
  gulp.src('app/css/main.css') // where modernizr will look for classes
    .pipe(modernizr({
      options: ['setClasses'],
      dest: 'app/js/modernizr-custombuild.js'
    }))
});


// Validate build HTML:
gulp.task('validateHTML', function () {
  gulp.src('dist/**/*.html')
    .pipe(validateHTML())
});


// Deploy a build to the 'gh-pages' GitHub branch by running 'deploy':

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// ***** Plugins That Automatically Run As Part of a Single Process ***** //

// These processes are not typically run from the command line but from the processes above.


// Process Sass to CSS, add sourcemaps, autoprefix CSS selectors, optionally Base64 font and image files into CSS, and reload browser:
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(postcss([assets({
      loadPaths: ['fonts/', 'images/']
    })]))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})


// Watch sass, html, and js and reload browser if any changes:
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/scss/**/*.scss');
  gulp.watch('app/js/**/*.js', ['js-lint']);
  gulp.watch('app/**/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


// Spin up a local browser with the index.html page at http://localhost:3000/
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app',
      middleware: ssi({
        baseDir: __dirname + '/app',
        ext: '.html',
        version: '1.4.0'
      })
    },
  })
})


// Concatenate and minify CSS and JavaScript from paths within useref tags during build process; include files:
gulp.task('useref', function(){
  return gulp.src(['app/**/*.html', '!app/includes/*'])
    .pipe(useref())
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(lbInclude()) // Process <!--#include file="" --> statements
    .pipe(gulp.dest('dist'))
});


// Delete 'dist' directory at start of build process:
gulp.task('clean', function() {
  return del('dist');
})


// Copy images to dist directory during the build process:
gulp.task('copy-images', function(){
  return gulp.src('app/images/**')
  .pipe(gulp.dest('dist/images'))
});


// Lint JavaScript:
gulp.task('js-lint', function() {
  return gulp.src(['app/js/**/*.js', '!app/js/modernizr-custombuild.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});
