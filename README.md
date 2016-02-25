# Gulp Template

A basic gulp toolkit for front-end web development.

Inspired by https://css-tricks.com/gulp-for-beginners

## Includes the Following Tasks

* Process Sass and add sourcemaps for debugging

* Start a local browser with the index page at http://localhost:3000/

* Reload HTML, CSS, and JavaScript in the browser immediately upon any changes to these files during development

* Lint JavaScript and Sass during the development and build processes

* Concatenate and minify CSS and JavaScript during the build process

* Compress images during build process

* Combine SVG files into one and reference them within HTML

* Copy all files from a development directory into a distribution directory during the build process

* Include HTML fragments using `<!--#include file="" -->` statements

* Generate a custom Modernizr file based off of classes found in CSS

* Validate HTML after the build process

* Deploy a build via SFTP to a web server

## Requirements

* node.js

* npm

* ruby (for the scss-lint plugin)

## Installation

1. Clone this repo and cd to it on your machine

2. Run `$ npm update --save-dev` to install all gulp plugins

3. Run `$ gem install scss_lint` (for the scss-lint plugin)

## Running

* Confirm that gulp system is installed: `$ gulp hello` (should return "Hello there!" in your console)

* During development, run `$ gulp` to watch changes to your files

* To create a build for a web server, run `$ gulp build`

* To deploy a build to a web server, run `$ gulp deploy`

* To combine SVG files into one, run `$ gulp svgstore`

* To update the custom modernizr file based off of classes found in CSS, run `$ gulp modernizr` anytime after introducing new CSS features referenced in the [Modernizr development build](https://modernizr.com)

* To validate HTML of a build using the W3C validation service, run `$ gulp validateHTML`
