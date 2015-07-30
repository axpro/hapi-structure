'use strict';

// import libraries
var gulp        = require('gulp'),
    nodemon     = require('gulp-nodemon'),
    browserSync = require('browser-sync');

/*********************
 * GULP SERVER TASKS *
 *********************/

gulp.task('nodemon:front-application', ['lint', 'watch'], function(cb)
{
    var started = false;

    // configure nodemon
    return nodemon({
        script: './index.js',
        ext: 'html js json',
        watch: ['lib', 'test', 'config', 'index.js', 'client/views'],
        tasks: ['lint']
    })
        .on('start', function ()
        {
            if (!started)
            {
                started = true;
                setTimeout(function () {
                    browserSync.reload({ stream: false });
                    cb();
                }, 1000);
            }
        })
        .on('restart', function ()
        {
            setTimeout(function () {
                browserSync.reload({ stream: false });
            }, 1000);
        });
});

gulp.task('serve:api-application', ['lint'], function(cb)
{
    var started = false;

    // configure nodemon
    return nodemon({
        script: './index.js',
        ext: 'js json',
        watch: ['lib', 'test', 'config', 'index.js'],
        tasks: ['lint']
    })
        .on('start', function ()
        {
            if (!started)
            {
                started = true;
                cb();
            }
        });
});

gulp.task('serve:front-application', ['nodemon:front-application'], function()
{
    return browserSync.init(null, {
        proxy: '127.0.0.1:7080',  // local node app address
        port: 5000,  // use *different* port than above
        notify: true
    });
});