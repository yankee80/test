'use strict';

var gulp = require('gulp'),
  requireDir = require('require-dir');

requireDir('./gulp', {recurse: false});

gulp.task('default', ['clean:tmp','connect:tmp']);
