'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// run 'gulp jshint' in the console to lint every js file under the server folder
// and all its sub folders
gulp.task("jshint", function(){
  gulp.src("./server/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"));
});
