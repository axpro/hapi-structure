'use strict';

// import libraires
var gulp        = require('gulp'),
    internals   = {};

// internals variables
internals.$ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'browser-sync']
});

/********************
 * GULP BUILD TASKS *
 ********************/

gulp.task('styles', ['wiredep', 'injector:css:preprocessor'/*, 'injector:css:bower:preprocessor'*/], function ()
{
  return gulp.src(['client/styles/index.scss', 'client/styles/vendor.scss'])
      .pipe(internals.$.sass({style: 'expanded'}))
      .on('error', function handleError(err) {
        console.error(err.toString());
        this.emit('end');
      })
      .pipe(internals.$.autoprefixer())
      .pipe(gulp.dest('.tmp/styles/'));
});

gulp.task('injector:css:preprocessor', function ()
{
  return gulp.src('client/styles/index.scss')
    .pipe(internals.$.inject(gulp.src([
        'client/styles/**/*.scss',
        '!client/styles/index.scss',
        '!client/styles/vendor.scss'
      ], {read: false}), {
      transform: function(filePath) {
        filePath = filePath.replace('client/styles/', '');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    }))
    .pipe(gulp.dest('client/styles/'));
});

/*gulp.task('injector:css:bower:preprocessor', function ()
{
  return gulp.src('client/styles/vendor.scss')
    .pipe(internals.$.inject(gulp.src([
    ], {read: false}), {
      transform: function(filePath) {
        filePath = filePath.replace('bower_components/', '../../bower_components/');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    }))
    .pipe(gulp.dest('client/styles/'));
});*/

gulp.task('injector:css', ['styles'], function ()
{
  return gulp.src('client/views/layout/layout.html')
    .pipe(internals.$.inject(gulp.src([
        '.tmp/styles/**/*.css',
        '!.tmp/styles/vendor.css'
      ], {read: false}), {
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(gulp.dest('client/views/layout/'))
    .pipe(internals.$.browserSync.reload({stream: true}));
});

gulp.task('scripts', function ()
{
  return gulp.src('client/scripts/**/*.js')
    .pipe(internals.$.jshint())
    .pipe(internals.$.jshint.reporter('jshint-stylish'));
});

gulp.task('injector:js', ['scripts'], function ()
{
  return gulp.src('client/views/layout/layout.html')
    .pipe(internals.$.inject(gulp.src('client/scripts/**/*.js'), {
      ignorePath: 'client',
      addRootSlash: false
    }))
    .pipe(gulp.dest('client/views/layout/'))
    .pipe(internals.$.browserSync.reload({stream: true}));
});

gulp.task('client', ['wiredep', 'injector:css', 'injector:js'], function ()
{
  var htmlFilter = internals.$.filter('**/*.html', {restore: true});
  var jsFilter = internals.$.filter('**/*.js', {restore: true});
  var cssFilter = internals.$.filter('**/*.css', {restore: true});
  var assets;

  return gulp.src(['client/views/**/*.html'], {base: './'})
    .pipe(assets = internals.$.useref.assets())
    .pipe(internals.$.rev())
    .pipe(jsFilter)
    .pipe(internals.$.uglify({preserveComments: internals.$.uglifySaveLicense}))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(internals.$.replace('../../bower_components/bootstrap-sass-official/assets/fonts/bootstrap','/fonts'))
    .pipe(internals.$.csso())
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe(internals.$.useref())
    .pipe(internals.$.revReplace())
    .pipe(htmlFilter)
    .pipe(internals.$.replace('client/', ''))
    .pipe(internals.$.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest('dist/'))
    .pipe(internals.$.size({ title: 'dist/', showFiles: true }));
});

gulp.task('images'/*, ['images:bower']*/, function ()
{
  return gulp.src('client/assets/images/**/*')
    .pipe(internals.$.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/client/assets/images/'));
});

/*gulp.task('images:bower', function ()
{
  return gulp.src([
  ])
    .pipe(internals.$.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/client/assets/images/vendor'));
});*/

gulp.task('fonts', ['fonts:app'], function ()
{
  var fontsFilter = internals.$.filter('**/*.{eot,svg,ttf,woff,woff2}');

  return gulp.src(internals.$.mainBowerFiles())
    .pipe(fontsFilter)
    .pipe(internals.$.flatten())
    .pipe(gulp.dest('dist/client/assets/fonts/'));
});

gulp.task('fonts:app', function ()
{
  var fontsFilter = internals.$.filter('**/*.{eot,svg,ttf,woff,woff2}');

  return gulp.src('client/assets/fonts/**/*')
    .pipe(fontsFilter)
    .pipe(internals.$.flatten())
    .pipe(gulp.dest('dist/client/assets/fonts/'));
});

gulp.task('lint', function() {
  gulp.src(['./index.js', './lib/**/*.js', './test/**/*.js', './config/**/*.js', './translations/**/*.js'])
      .pipe(internals.$.jshint())
      .pipe(internals.$.jshint.reporter('jshint-stylish'));
});

gulp.task('server', ['lint'], function()
{
  var jsFilter = internals.$.filter('**/*.js', {restore: true}),
      jsonFilter = internals.$.filter('**/*.json', {restore: true});

  gulp.src(['package.json', 'index.js', 'License.md', 'README.md', 'lib/**/*', 'config/**/*', 'translations/**/*'], {base: './'})
      .pipe(jsonFilter)
      .pipe(internals.$.jsonminify())
      .pipe(jsonFilter.restore)
      .pipe(gulp.dest('dist/'))
      .pipe(jsFilter)
      .pipe(internals.$.uglify({preserveComments: internals.$.uglifySaveLicense}))
      .pipe(jsFilter.restore)
      .pipe(gulp.dest('dist/'))
      .pipe(internals.$.size({ title: 'dist/', showFiles: true }));
});

gulp.task('clean', function()
{
  internals.$.del.sync(['dist/', '.tmp/']);
});

gulp.task('build:front-application', ['clean', 'server', 'client', 'images', 'fonts']);
gulp.task('build:api-application', ['clean', 'server']);
