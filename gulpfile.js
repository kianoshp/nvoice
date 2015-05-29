'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var livereload = require('gulp-livereload');

// run 'gulp jshint' in the console to run jshint on every .js file under the server folder
// and all its sub folders
gulp.task("jshint", function(){
  gulp.src("./server/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./server/**/*.js');
});
