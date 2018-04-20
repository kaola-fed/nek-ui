var gulp = require('gulp');

var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config');
var rimraf = require('rimraf');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ignore = require('gulp-ignore');
var minifycss = require('gulp-clean-css');
var sequence = require('run-sequence');
var all = require('gulp-all');
var mcss = require('gulp_mcss');
var glob = require('glob');
var path = require('path');
var Hexo = require('hexo');
var fs = require('fs');
var argv = require('yargs').argv;
var doc = require('./doc/source/doc');
var themes = require('./src/mcss/themes');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('dist-clean', function(cb) {
    rimraf('{dist,doc/public}', function() {
        rimraf('doc/source/components/*_.md', cb)
    })
});

gulp.task('dist-copy', function() {
    return all(
        gulp.src('./src/fonts/**').pipe(gulp.dest('./dist/fonts')),
        gulp.src([
            './node_modules/regularjs/dist/regular.min.js',
            './node_modules/regularjs/dist/regular.js'
        ]).pipe(gulp.dest('./dist/vendor'))
    );
});

gulp.task('dist-js', function() {
    const distjs =  gulp.src('./src/js/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist/js'))
        .pipe(ignore.exclude('*.js.map'))
        .pipe(rename({
            suffix: '.min'
        }))
        if(!argv.dev){
            distjs.pipe(uglify())
        }
        distjs.pipe(gulp.dest('./dist/js'));
    return distjs
});

gulp.task('dist-css', function() {
    var gulpCSS = function(theme) {
        return gulp.src('./src/mcss/' + theme + '.mcss')
            .pipe(mcss({
                pathes: ['./node_modules'],
                importCSS: true
            }))
            .pipe(rename('JR.' + theme + '.css'))
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
    var hexo = new Hexo(path.join(__dirname, 'doc'), {
        dev: argv.dev
    });
    doc(argv.dev, function() {
        hexo.init().then(function() {
            hexo.call('generate', {}, cb);
        });
    })
});

gulp.task('dist', function(done) {
    sequence('dist-clean', ['dist-copy', 'gen-mcss', 'dist-js', 'dist-css'], done);
});


gulp.task('reload', function() {
    reload();
});

gulp.task('source-copy', function(done) {
    return all(
        gulp.src('./dist/js/JR.min.js').pipe(gulp.dest('./doc/public/JR/js')),
        gulp.src('./dist/css/JR.default.min.css').pipe(gulp.dest('./doc/public/JR/css')),
        gulp.src('./dist/fonts/**').pipe(gulp.dest('./doc/public/JR/fonts')),
        gulp.src('./dist/vendor/regular.min.js').pipe(gulp.dest('./doc/public/JR/vendor'))
    );
});

// 代码片段拷贝
gulp.task('snippet-copy', function(){
    return gulp.src('./snippet/**').pipe(gulp.dest('./dist/snippet'));
});

gulp.task('default', function (done) {
    sequence('dist', 'gen-doc', 'source-copy', 'snippet-copy', 'reload', done);
});

gulp.task('server', ['default'], function () {
    browserSync.init({
        server: {
            // baseDir: ['./doc/public', './dist'],
            baseDir: './doc/public',
            index: 'JR/components/index.html'
        },
        browser: 'default',
        ghostMode: false,
        reloadDelay: 1000,
        cors: true,
        port: 8089
    });
});

gulp.task('watch', ['server'], function() {
    gulp.watch(['./src/**/*'], ['default']);
});