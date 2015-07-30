'use strict';

var gulp = require('gulp');

/********************
 * GULP WATCH TASKS *
 ********************/

gulp.task('watch', ['wiredep', 'injector:css', 'injector:js'], function ()
{
  gulp.watch('client/styles/**/*.scss', ['injector:css']);
  gulp.watch('client/scripts/**/*.js', ['injector:js']);
  gulp.watch('bower.json', ['wiredep']);
});
