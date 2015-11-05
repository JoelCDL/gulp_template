# Gulp Template

A basic gulp toolkit for front-end web development.

Inspired by https://css-tricks.com/gulp-for-beginners

## Plugins Included

* Process Sass and add sourcemaps for debugging

* Start a local browser with the index page at http://localhost:3000/

* Reload HTML, CSS, and JavaScript in the browser immediately upon any changes during development

* Lint JavaScript and Sass immediately upon any changes during development, including during the build process

* Concatenate and minify CSS and JavaScript during the build process

* Compress images during build process

* Copy all files from development into a distribution directory during the build process

* Include HTML fragments using `<!--#include file="" -->` statements

* Generate a custom Modernizr file based off of classes found in CSS

* Validate HTML after the build process

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

* During development, run `$ gulp`

* To create a build, run `$ gulp build`

* To update the custom modernizr file based off of classes found in CSS, run `$ gulp modernizr` anytime after introducing new CSS features referenced in the [Modernizr development build](https://modernizr.com)

* To validate HTML using the W3C validation service, run `$ gulp validateHTML` after creating a build
