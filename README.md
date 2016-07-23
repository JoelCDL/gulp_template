# Gulp Template

A Gulp toolkit for front-end web development.

Inspired by https://css-tricks.com/gulp-for-beginners

## Includes the Following Tasks

* Process Sass and add sourcemaps for debugging CSS

* Start a local browser with the index page at http://localhost:3000/

* Reload HTML, CSS, and JavaScript in the browser immediately upon any changes to these files during development

* Lint JavaScript and Sass during the development and build processes

* Concatenate and minify CSS and JavaScript during the build process

* Minify PNG, JPEG, GIF and SVG images

* Copy all files from a development directory into a distribution directory during the build process

* Include HTML fragments using `<!--#include file="" -->` statements

* Generate a custom Modernizr file based off of classes found in CSS

* Validate HTML after the build process

* Deploy a build via SFTP from the distribution directory to a web server

## Requirements

* node.js

* npm

* ruby (for the Sass lint plugin)

## Installation

1. Clone this repo and cd to it on your machine

2. Run `$ npm update --save-dev` to install all gulp plugins

3. Run `$ gem install scss_lint` (for the Sass lint plugin)

## Running

* Cd to the directory where you installed the Gulp toolkit

* Confirm that Gulp system is installed: `$ gulp hello`

* During development, run `$ gulp` to watch changes to your files

* To create a build for a web server, run `$ gulp build`

* To minify images, run `$ gulp minify-images` anytime after adding new, unoptimized images

* To update the custom modernizr file based off of classes found in CSS, run `$ gulp modernizr` anytime after introducing new CSS features referenced in the [Modernizr development build](https://modernizr.com)

* To validate HTML of a build using the W3C validation service, run `$ gulp validateHTML`

* To deploy a build to a web server, run `$ gulp deploy`

## Notes

* For details about the Gulp plugins and how they are configured, please read the comments in `gulpfile.js`

* To configure the SFTP plugin to upload to a server, you will need to set authentication in a `json` file. [See examples from the gulp-sftp plugin page](https://www.npmjs.com/package/gulp-sftp/#authentication)

* For creating icon systems, this toolkit uses the PostCSS Assets plugin to inline images as Base64 into the CSS. To do this, change a CSS selector's `background:` property from the value `url` to `inline`. [More about inlining files with PostCSS Assets](https://github.com/assetsjs/postcss-assets#inlining-files)
