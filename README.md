# Gulp Template

A Gulp toolkit for front-end web development.

Inspired by https://css-tricks.com/gulp-for-beginners

## Includes the Following Tasks

* Live reload HTML, CSS, and JavaScript in the browser immediately upon changing these files during development

* Process Sass and add sourcemaps for debugging CSS

* Automatically add browser vendor prefixes to CSS selectors that need them

* Lint JavaScript and Sass during the development and build processes

* Concatenate and minify CSS and JavaScript during the build process

* Minify PNG, JPEG, GIF and SVG images

* Inline image and font files into the main stylesheet

* Include HTML fragments using `<!--#include file="" -->` statements

* Generate a custom Modernizr file based off of classes found in CSS

* Validate HTML after the build process

* Deploy a build of the dist directory via SFTP to a web server

## Requirements

* node.js

* npm

* ruby (for the Sass lint plugin)

## Installation

1. Clone this repo and cd to it on your machine

2. Run `$ npm update --save-dev` to install all gulp plugins

3. Run `$ gem install scss_lint` (for the Sass lint plugin)

## Running the Plugins

* Cd to the directory where you installed the Gulp toolkit

* Confirm that Gulp system is installed: `$ gulp hello`

* During development, run `$ gulp` to watch live changes to your files

* To minify images during development, run `$ gulp minify-images` anytime after adding new, unoptimized images

* To update the custom modernizr file based off of classes found in CSS, run `$ gulp modernizr` anytime after introducing new CSS features referenced in the [Modernizr development build](https://modernizr.com)

* To create a build of finished files, run `$ gulp build`

* To validate HTML of a build using the W3C validation service, run `$ gulp validateHTML`

* To deploy a build to a web server, run `$ gulp deploy`

## Notes

* This tookit assumes you are scaffolding your project with an `/app` directory where you develop your files and a `/dist` directory for the finished files that will be distributed for production. This can be changed by updating the path references in `gulpfile.js`.

* For details about using and configuring each Gulp plugin, find them listed within `gulpfile.js`, then search them from the [gulp.js plugin page](http://gulpjs.com/plugins/) and read their documentation.

* To configure the SFTP plugin to upload to a server, you will need to set authentication in a `json` file. [See examples from the gulp-sftp plugin page](https://www.npmjs.com/package/gulp-sftp/#authentication)

* This toolkit can inline image and font files as Base64 into the CSS to eliminate the paths to these assets and reduce HTTP requests for better performance. To do this, change a CSS selector's `url` value to `inline`. [More about inlining files with PostCSS Assets](https://github.com/assetsjs/postcss-assets#inlining-files)
