var gulp = require('gulp');

var webpack = require('gulp-webpack');
var webpackConfig = require('../webpack.config.js');
var rm = require('gulp-rimraf');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sequence = require('run-sequence');
var all = require('gulp-all');
var mcss = require('gulp_mcss');

var structure = require('../structure.js');
var buildAll = require('../doc-src/buildAll.js');

/**
 * ------------------------------------------------------------
 * Build Doc
 * ------------------------------------------------------------
 */

gulp.task('doc-clean', function() {
    return gulp.src('./docs', {read: false}).pipe(rm());
});

gulp.task('doc-copy', function() {
    return all(
        gulp.src('./CNAME').pipe(gulp.dest('./docs')),
        gulp.src('./doc-src/assets/**').pipe(gulp.dest('./docs')),
        gulp.src('./node_modules/font-awesome/fonts/**').pipe(gulp.dest('./docs/fonts')),
        gulp.src([
            './node_modules/regularjs/dist/regular.min.js',
            './node_modules/marked/marked.min.js'
        ]).pipe(gulp.dest('./docs/vendor'))
    );
});

gulp.task('doc-js', function() {
    return gulp.src('./src/js/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./docs/js'));
});

gulp.task('doc-css', function() {
    var gulpCSS = function(theme) {
        return [
            gulp.src('./src/mcss/' + theme + '.mcss')
                .pipe(mcss({
                    pathes: ['./node_modules'],
                    importCSS: true
                }))
                .pipe(rename('regular-ui.' + theme + '.css'))
                .pipe(rename({suffix: '.min'}))
                .pipe(minifycss())
                .pipe(gulp.dest('./docs/css')),
            gulp.src('./doc-src/mcss/' + theme + '.mcss')
                .pipe(mcss({
                    pathes: ['./node_modules'],
                    importCSS: true
                }))
                .pipe(rename('doc.' + theme + '.min.css'))
                .pipe(minifycss())
                .pipe(gulp.dest('./docs/css'))
        ];
    }
    
    return all(Array.prototype.concat.apply([], structure.themes.map(gulpCSS)));
});

gulp.task('doc-build', function(done) {
    return buildAll(done);
});

gulp.task('doc', function(done) {
    sequence('doc-clean', 'doc-copy', ['doc-js', 'doc-css', 'doc-build'], done);
});
