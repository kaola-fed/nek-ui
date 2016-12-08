var gulp = require('gulp');
var browserSync =require('browser-sync').create();
gulp.THEMES = ['default'];

require('./gulp/dist.js');
require('./gulp/doc.js');

gulp.task('default', ['dist', 'doc']);

gulp.task('server', function(){
    browserSync.init({
		server: {
		baseDir: './'
		},
		files: 'src/, test',
		browser: 'google chrome',
		reloadDelay: 1000,
		port:8089
    });

    gulp.watch(['./src/**/*'], ['dist']);

});

gulp.task('watch', function () {
    gulp.watch(['./doc-src/**/*', './src/**/*'], ['default']);
});