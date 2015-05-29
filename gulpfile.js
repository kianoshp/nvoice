'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

// run 'gulp jshint' in the console to run jshint on every .js file under the server folder
// and all its sub folders
gulp.task("jshint", function(){
  gulp.src("./server/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"));
});

// run 'gulp test' to run test suite
gulp.task('test', function(){
  return gulp.src(['./test/**/*.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .on('error', gutil.log);
});

// run 'gulp watch' to watch all .js files and have livereload listen for changes
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./server/**/*.js');
});
