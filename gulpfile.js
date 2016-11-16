var gulp = require('gulp');
gulp.THEMES = ['default'];

require('./gulp/dist.js');
require('./gulp/doc.js');

gulp.task('default', ['dist', 'doc']);

gulp.task('watch', function () {
    gulp.watch(['./doc-src/**/*', './src/**/*'], ['default']);
});