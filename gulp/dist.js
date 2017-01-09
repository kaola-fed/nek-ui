var gulp = require('gulp');

var webpack = require('gulp-webpack');
var webpackConfig = require('../webpack.config.js');
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
var fs = require('fs');

var structure = require('../structure.js');

/**
 * ------------------------------------------------------------
 * Build Dist
 * ------------------------------------------------------------
 */

gulp.task('dist-clean', function(cb) {
    rimraf('./dist', cb)
});

gulp.task('dist-copy', function() {
    return all(
        gulp.src('./node_modules/font-awesome/fonts/**').pipe(gulp.dest('./dist/fonts')),
        gulp.src([
            './node_modules/regularjs/dist/regular.min.js',
            './node_modules/regularjs/dist/regular.js',
            './node_modules/marked/marked.min.js'
        ]).pipe(gulp.dest('./dist/vendor'))
    );
});

gulp.task('dist-js', function() {
    return gulp.src('./src/js/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist/js'))
        .pipe(ignore.exclude('*.js.map'))
        .pipe(rename({suffix: '.min'}))
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
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('./dist/css'));
    }
    
    return all(structure.themes.map(gulpCSS));
});

gulp.task('gen-mcss', function(cb) {
  glob(path.join(__dirname, '../src/js/components/**/**/*.mcss'), function (er, files) {
    var out = '';
    files.forEach(function(d) {
      out += '@import "' + d + '";\n';
    });
    fs.writeFileSync(path.join(__dirname, '../src/mcss/components.mcss'), out);
    cb();
  })
});

gulp.task('dist', function(done) {
    sequence('dist-clean', 'gen-mcss', ['dist-copy', 'dist-js', 'dist-css'], done);
});