var gulp = require('gulp');

var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config');
var rimraf = require('rimraf');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ignore = require('gulp-ignore');
var minifycss = require('gulp-minify-css');
var sequence = require('run-sequence');
var all = require('gulp-all');
var mcss = require('gulp_mcss');
var glob = require('glob');
var path = require('path');
var Hexo = require('hexo');
var fs = require('fs');
var doc = require('./src/js/components/doc');
var themes = require('./src/mcss/themes');

var hexo = new Hexo(process.cwd(), {});
hexo.init();

var browserSync = require('browser-sync').create();

gulp.task('dist-clean', function(cb) {
  rimraf('{dist,public}', function() {
    rimraf('doc/components/_*', cb)
  })
});

gulp.task('dist-copy', function() {
  return all(
    gulp.src('./node_modules/font-awesome/fonts/**').pipe(gulp.dest('./dist/fonts'))
  );
});

gulp.task('dist-js', function() {
  return gulp.src('./src/js/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist/js'))
    .pipe(ignore.exclude('*.js.map'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('dist-css', function() {
  var gulpCSS = function(theme) {
    return gulp.src('./src/mcss/' + theme + '.mcss')
      .pipe(mcss({
        pathes: ['./node_modules'],
        importCSS: true
      }))
      .pipe(rename('nek-ui.' + theme + '.css'))
      .pipe(gulp.dest('./dist/css'))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(minifycss())
      .pipe(gulp.dest('./dist/css'));
  }

  return all(themes.map(gulpCSS));
});

gulp.task('gen-mcss', function(cb) {
  glob(path.join(__dirname, './src/js/components/**/**/*.mcss'), function(er, files) {
    var out = '';
    files.forEach(function(d) {
      out += '@import "' + d + '";\n';
    });
    fs.writeFileSync(path.join(__dirname, './src/mcss/components.mcss'), out);
    cb();
  })
});

gulp.task('gen-doc', function(cb) {
  doc(function() {
    hexo.call('generate', {}, cb);
  })
});

gulp.task('default', function(done) {
  sequence('dist-clean', ['dist-copy', 'gen-mcss', 'dist-js', 'dist-css'], 'gen-doc', done);
});

gulp.task('server', ['default'], function() {
  browserSync.init({
    server: {
      baseDir: './public'
    },
    browser: 'default',
    reloadDelay: 1000,
    port: 8089
  });
});

gulp.task('watch', ['server'], function() {
  gulp.watch(['./src/**/*'], ['default']);
});