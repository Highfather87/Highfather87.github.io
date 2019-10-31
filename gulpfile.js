var browsersync = require('browser-sync');
var cp = require('child_process');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

var paths = {
html: {
src: './app//*.html',
},
jekyll: {
src: './app',
dist: './_site',
},
markdown: {
src: './app//.markdown',
},
styles: {
src: './app/_sass/**/.scss',
dist: './app/css',
}
};

gulp.task(jekyllbuild);
gulp.task('jekyllrebuild', gulp.series(jekyllbuild, function(cb) {
browsersync.reload();
cb();
}));
gulp.task(serve);
gulp.task(styles);
gulp.task(watch);
gulp.task('default',
gulp.series(
styles,
jekyllbuild,
gulp.parallel(serve, watch))
);

function jekyllbuild(done) {
browsersync.notify('building jekyll');
return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
.on('close', done);
}

function jekyllrebuild() {
browsersync.reload();
};

function serve() {
browsersync.init({
server: paths.jekyll.dist,
notify: true
})
}

function styles() {
return gulp.src(paths.styles.src)
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest(paths.jekyll.dist + '/css'))
.pipe(browsersync.stream())
.pipe(gulp.dest(paths.styles.dist))
}

function watch() {
gulp.watch(paths.styles.src, styles);
gulp.watch(paths.html.src, gulp.series('jekyllrebuild'));
gulp.watch(paths.markdown.src, gulp.series('jekyllrebuild'));
}