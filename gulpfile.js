var browsersync = require('browser-sync');
var cp = require('child_process');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

gulp.task(serve);
gulp.task(gulpSass);
gulp.task(jekyllbuild);
gulp.task(jadeO);



gulp.task('jekyllrebuild', gulp.series(jekyllbuild, function(cb) {
browsersync.reload();
cb();
}));

//gulp.task(jade);
gulp.task('default', gulp.series(gulpSass,jadeO,jekyllbuild,gulp.parallel(serve, jadeO,watch)));


var paths = {
html: {
src: './_includes/*.html',
},
jekyll: {
src: './app',
dist: './_site',
},
markdown: {
src: './app//.markdown',
},
styles: {
src: './assets/css/**/*.scss',
dist: './app/css',
},
jadem: {
src: './app/_sass/**/.scss',
dist: './app/css',
}
,
jadefiles: {
	src:'./_jadefiles/*.jade',
	dist:'./_includes'
},
};

function jekyllbuild(done) {
browsersync.notify('building jekyll');
var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";
return cp.spawn(jekyll,['build'], {stdio: 'inherit'}).on('close', done);
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

function jadeO() {
	return gulp.src(paths.jadefiles.src)
	.pipe(jade())
	.pipe(gulp.dest(paths.jadefiles.dist));
};


function gulpSass() {
return gulp.src(paths.styles.src)
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest(paths.styles.dist + '/css'))
.pipe(browsersync.stream())
.pipe(gulp.dest(paths.styles.dist))
}

function watch() {
gulp.watch(paths.styles.src, gulpSass);
gulp.watch(paths.jadefiles.src,jadeO);
gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], jekyllrebuild);
}