# Gulp Template

A basic gulp toolkit for front-end web development.

Inspired by https://css-tricks.com/gulp-for-beginners

## Plugins Included

* Process Sass and add sourcemaps for debugging

* Start a local browser with the index page at http://localhost:3000/

* Watch Sass, HTML, and js and reload browser if any changes

* Concatenate and minify CSS and JS from paths within 'build' comments in HTML

* Compress images during build process

* Copy all files from development into a distribution  directory during the build process

* Generate a custom Modernizr file based off of classes found in CSS

* Lint Sass, JS, and HTML immediately upon any changes, including during the build process

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

* For development: `$ gulp`

* To create a build: `$ gulp build`

* To build a custom modernizr file based off of classes found in CSS: `$ gulp modernizr`