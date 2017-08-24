const gulp = require('gulp');

const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const ignore = require('gulp-ignore');
const minifycss = require('gulp-clean-css');
const sequence = require('run-sequence');
const all = require('gulp-all');
const mcss = require('gulp_mcss');
const glob = require('glob');
const path = require('path');
const Hexo = require('hexo');
const fs = require('fs');
const argv = require('yargs').argv;
const doc = require('./doc/source/doc');
const themes = require('./src/mcss/themes');

const browserSync = require('browser-sync').create();

const reload = browserSync.reload;

gulp.task('dist-clean', (cb) => {
  rimraf('{dist,doc/public}', () => {
    rimraf('doc/source/components/*_.md', cb);
  });
});

gulp.task('dist-copy', () => all(
    gulp.src('./src/fonts/**').pipe(gulp.dest('./dist/fonts')),
    gulp.src([
      './node_modules/regularjs/dist/regular.min.js',
      './node_modules/regularjs/dist/regular.js',
    ]).pipe(gulp.dest('./dist/vendor'))));

gulp.task('dist-js', () => gulp.src('./src/js/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist/js'))
    .pipe(ignore.exclude('*.js.map'))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js')));

gulp.task('dist-css', () => {
  const gulpCSS = function (theme) {
    return gulp.src(`./src/mcss/${theme}.mcss`)
      .pipe(mcss({
        pathes: ['./node_modules'],
        importCSS: true,
      }))
      .pipe(rename(`nek-ui.${theme}.css`))
      .pipe(gulp.dest('./dist/css'))
      .pipe(rename({
        suffix: '.min',
      }))
      .pipe(minifycss())
      .pipe(gulp.dest('./dist/css'));
  };

  return all(themes.map(gulpCSS));
});

gulp.task('gen-mcss', (cb) => {
  glob(path.join(__dirname, './src/js/components/**/**/*.mcss'), (er, files) => {
    let out = '';
    files.forEach((d) => {
      out += `@import "${d}";\n`;
    });
    fs.writeFileSync(path.join(__dirname, './src/mcss/components.mcss'), out);
    cb();
  });
});

gulp.task('gen-doc', (cb) => {
  const hexo = new Hexo(path.join(__dirname, 'doc'), {
    dev: argv.dev,
  });
  hexo.extend.filter.register('after_post_render', (data) => {
    let md = data.content;
    md = md.replace(/<!-- demo_start -->/gim, '<div class="grid-item" markdown="1">');
    md = md.replace(/<!-- demo_end -->/gim, '</div>');
    data.content = md;
    return data;
  });

  doc(argv.dev, () => {
    hexo.init().then(() => {
      hexo.call('generate', { watch: true }, cb);
    });
  });
});

gulp.task('gen-easy-doc', (cb) => {
  doc(argv.dev, cb);
});

gulp.task('dist', (done) => {
  sequence('dist-clean', ['dist-copy', 'gen-mcss', 'dist-js', 'dist-css'], done);
});

gulp.task('reload', () => {
  reload();
});

gulp.task('default', (done) => {
  sequence('dist', 'gen-doc', 'reload', done);
});

gulp.task('default-doc', (done) => {
  sequence('gen-doc', 'reload', done);
});

gulp.task('server', ['default'], () => {
  browserSync.init({
    server: {
      baseDir: ['./doc/public', './dist'],
    },
    browser: 'default',
    ghostMode: false,
    reloadDelay: 1000,
    cors: true,
    port: 8089,
  });
});

gulp.task('watch', ['server'], () => {
  gulp.watch(['./src/**/*'], ['default']);
});

gulp.task('watch-doc', ['server'], () => {
  gulp.watch(['./src/**/*', './doc/source/partials/**/*'], ['easy-doc']);
});
