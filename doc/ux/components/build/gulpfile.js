const gulp = require('gulp');

const webpack = require('webpack-stream');
const webpackConfig = require('../build/webpack.config');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const ignore = require('gulp-ignore');
const minifycss = require('gulp-clean-css');
const sequence = require('run-sequence');
const all = require('gulp-all');
const glob = require('glob');
const path = require('path');
const Hexo = require('hexo');
const fs = require('fs');
const argv = require('yargs').argv;
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

const browserSync = require('browser-sync').create();

const reload = browserSync.reload;

const postcssConfig = require('../build/postcss.config');

gulp.task('dist-clean', (cb) => {
  rimraf('{dist}', cb);
});

gulp.task('dist-copy', () => all(
    gulp.src(path.join(__dirname, '../src/fonts/**')).pipe(gulp.dest(path.join(__dirname, '../dist/fonts'))),
    gulp.src([
      path.join(__dirname, '../node_modules/regularjs/dist/regular.min.js'),
      path.join(__dirname, '../node_modules/regularjs/dist/regular.js'),
    ]).pipe(gulp.dest(path.join(__dirname, '../dist/vendor')))));

gulp.task('dist-js', () => gulp.src(path.join(__dirname, '../src/js/index.js'))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(path.join(__dirname, '../dist/js')))
    .pipe(ignore.exclude('*.js.map'))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(__dirname, '../dist/js'))));


gulp.task('dist-css', () => {
  gulp.src(path.join(__dirname, '../src/scss/index.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssConfig.plugins))
        .pipe(rename('ux-ui.default.css'))
        .pipe(gulp.dest(path.join(__dirname, '../dist/css')))
        .pipe(rename({
          suffix: '.min',
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(path.join(__dirname, '../dist/css')));
});

gulp.task('gen-mcss', (cb) => {
  glob(path.join(__dirname, '../src/js/components/**/**/*.scss'), (er, files) => {
    let out = '';
    files.forEach((d) => {
      out += `@import "${d}";\n`;
    });
    fs.writeFileSync(path.join(__dirname, '../src/scss/components.scss'), out);
    cb();
  });
});

gulp.task('dist', (done) => {
  sequence('dist-clean', ['dist-copy', 'gen-mcss', 'dist-js', 'dist-css'], done);
});

gulp.task('reload', () => {
  reload();
});

gulp.task('default', (done) => {
  sequence('dist', 'reload', done);
});

gulp.task('server', ['default'], () => {
  browserSync.init({
    server: {
      baseDir: ['../dist'],
    },
    browser: 'default',
    ghostMode: false,
    reloadDelay: 1000,
    cors: true,
    port: 9090,
  });
});

gulp.task('watch', ['default', 'server'], () => {
  gulp.watch(['../src/**/*'], ['default']);
});

/* 本地开发配置环境 */
gulp.task('dev-server', ['default-dev'], () => {
    browserSync.init({
        server: {
            baseDir: ['../examples', '../dist'],
        },
        browser: 'default',
        ghostMode: false,
        reloadDelay: 1000,
        cors: true,
        port: 8080,
    });
});

gulp.task('default-dev', (done) => {
    sequence('dist', 'reload', done);
});

gulp.task('new', ['dev-server'], () => {
    gulp.watch(['../src', '../examples']);
});
