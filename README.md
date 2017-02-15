# Gulp Template

A Gulp toolkit for front-end web development.

Inspired by https://css-tricks.com/gulp-for-beginners

## Includes the Following Tasks

* Live reload HTML, CSS, and JavaScript in the browser immediately upon changing these files during development

* Process Sass and add sourcemaps for debugging CSS

* Automatically add browser vendor prefixes to CSS selectors that need them

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

## Installation

1. Clone this repo and cd to it on your machine

2. Run `$ npm update --save-dev` to install all gulp plugins

3. Run `$ gem install scss_lint` (for the Sass lint plugin)

## Running the Plugins

* Cd to the directory where you installed the Gulp toolkit

* Confirm that Gulp system is installed: `$ gulp hello`

* During development, run `$ gulp` to watch live changes to your files

* To minify images during development, run `$ gulp minify-images` after adding new, unoptimized images

* To update the custom modernizr file based off of classes found in CSS, run `$ gulp modernizr` after introducing new CSS features referenced in the [Modernizr development build](https://modernizr.com)

* To create a build of finished files, run `$ gulp build`

* To validate HTML of a build using the W3C validation service, run `$ gulp validateHTML`

* To deploy a build to a web server, run `$ gulp deploy`

## Scaffolding

The **app** directory is where development takes place, where files are created and modified. When a build is run, it creates a **dist** directory of finished files, ready for distribution to production environments. The **dist** directory is ignored by Git, since we don't need to check our builds into source control. Each time a build is created, it will overwrite all previous contents within **dist**. The **app** and **dist** directory names can be changed by updating the path references in `gulpfile.js`.

The following files and directories configure the Gulp Toolkit. The **node_modules** directory is ignored by Git.

* gulpfile.js
* node_modules
* package.json
* scss-lint-config.yml

## Notes

For details about using and configuring each Gulp plugin, find them listed within `gulpfile.js`, then search them from the [gulp.js plugin page](http://gulpjs.com/plugins/) and read their documentation.

This toolkit can inline image and font files as Base64 into the CSS to eliminate the paths to these assets and reduce HTTP requests for better performance. To do this, change a CSS selector's `url` value to `inline`. [More about inlining files with PostCSS Assets](https://github.com/assetsjs/postcss-assets#inlining-files)

When running the `gulp-sftp` plugin via `$ gulp deploy`, it will return the error, `SFTP error or directory exists` for directories that are already on the server (like `/images`). This is not an actual error and the plugin will overwrite the directory with the uploaded contents, as expected.
