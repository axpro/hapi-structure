'use strict';

// import libraries
var gulp    = require('gulp'),
    replace = require('gulp-replace');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  return gulp.src('client/views/layout/layout.html')
    .pipe(wiredep({
      directory: 'bower_components',
      exclude: [/bootstrap-sass-official/, /bootstrap\.css/, /modernizr/]
    }))
    .pipe(replace('../../../bower_components', 'bower_components'))
    .pipe(gulp.dest('client/views/layout/'));
});
