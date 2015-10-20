// ##### Gulp Tasks #####

// ***** Modified from https://css-tricks.com/gulp-for-beginners/ ***** //

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var modernizr = require('gulp-modernizr');
var runSequence = require('run-sequence');
var validateHTML = require('gulp-w3cjs');
var scsslint = require('gulp-scss-lint');


// Check that gulp is working by running "gulp hello" at the command line:
gulp.task('hello', function() {
  console.log('Hello Joel!');
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
    ['sass', 'useref', 'images', 'fonts', 'validateHTML'],
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


// Process sass and add sourcemaps:
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})


// Watch sass, html, and js and reload browser if any changes:
gulp.task('watch', ['browserSync', 'sass', 'validateHTML'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', ['validateHTML']);
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


// Spin up a local browser with the index.html page at http://localhost:3000/
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})


// Minify and uglify css and js from paths within comment tags in html:
gulp.task('useref', function(){
  var assets = useref.assets();

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(gulpIf('*.css', minifyCSS())) // Minifies only if it's a CSS file
    .pipe(gulpIf('*.js', uglify())) // Uglifies only if it's a Javascript file
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});


// Compress images:
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({ // Caching images that ran through imagemin
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});


// Copy font files from "app" directory to "dist" directory during build process:
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})


// Delete "dist" directory at start of build process:
gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
})

// Validate HTML:
gulp.task('validateHTML', function () {
  gulp.src('app/*.html')
    .pipe(validateHTML())
});

// Lint SCSS files:
gulp.task('scss-lint', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(scsslint());
});

