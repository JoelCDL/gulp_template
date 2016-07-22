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
var scsslint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');
var lbInclude = require('gulp-lb-include');
var ssi = require('browsersync-ssi');
var sftp = require('gulp-sftp');
var postcss = require('gulp-postcss');
var assets = require('postcss-assets');


// Check that gulp is working by running "gulp hello" at the command line:
gulp.task('hello', function() {
  console.log('Hello there!');
});


// Run the dev process by running "gulp" at the command line:
gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})


// Run the build process by running "gulp build" at the command line:
gulp.task('build', function (callback) {
  runSequence('clean', 
    ['scss-lint', 'js-lint', 'sass', 'useref'],
    callback
  )
})


// Run "gulp modernizr" at the command line to build a custom modernizr file based off of classes found in CSS:
gulp.task('modernizr', function() {
  gulp.src('app/css/main.css') // where modernizr will look for classes
    .pipe(modernizr({
      options: ['setClasses'],
      dest: 'app/js/modernizr-custombuild.js'
    }))
});


// Process sass to css, add sourcemaps, inline font & image files into css, and reload browser:
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
gulp.task('watch', ['browserSync', 'sass', 'scss-lint', 'js-lint'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/scss/**/*.scss', ['scss-lint']);
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


// Minify CSS, uglify JS, and concatenate files from paths within HTML comment tags; include files:
gulp.task('useref', function(){
  return gulp.src(['app/**/*.html', '!app/includes/*'])
    .pipe(useref())
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(lbInclude()) // Process <!--#include file="" --> statements
    .pipe(gulp.dest('dist'))
});


// Minify images:
gulp.task('minify-images', function(){
  return gulp.src('app/images/**')
  .pipe(imagemin())
  .pipe(gulp.dest('app/images'))
});


// Delete "dist" directory at start of build process:
gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
})


// Validate build HTML:
gulp.task('validateHTML', function () {
  gulp.src('dist/**/*.html')
    .pipe(validateHTML())
});


// Lint Sass:
gulp.task('scss-lint', function() {
  return gulp.src(['app/scss/**/*.scss', '!app/scss/vendor/**/*.scss'])
    .pipe(scsslint({
      'config': 'scss-lint-config.yml'
    }));
});


// Lint JavaScript:
gulp.task('js-lint', function() {
  return gulp.src(['app/js/**/*.js', '!app/js/modernizr-custombuild.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});


// Deploy a build via SFTP to a web server:
gulp.task('deploy', function () {
  return gulp.src('dist/**')
    .pipe(sftp({
      host: 'webprod.cdlib.org',
      remotePath: '/apps/webprod/apache/htdocs/gulptemplate/',
      authFile: 'gulp-sftp-key.json', // keep this file out of public repos by listing it within .gitignore, .hgignore, etc.
      auth: 'keyMain'
    }));
});
