'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var noop = function () {};

// run 'gulp lint' in the console to run jshint and jscs on every .js file under the server folder
// and all its sub folders
gulp.task('lint', function(){
  gulp.src(['./server/**/*.js', '!./server/swagger-ui/**'])
    .pipe(jshint())
    .pipe(jscs())
    .on('error', noop)
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});

// run 'gulp test' to run test suite
gulp.task('test', function(){
  return gulp.src(['./server/assets/tests/specs/*.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .on('error', gutil.log)
    .once('end', function () {
      process.exit();
    });
});

// run 'gulp watch' to watch all .js files and have livereload listen for changes
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./server/**/*.js', ['lint', 'test']);
});
