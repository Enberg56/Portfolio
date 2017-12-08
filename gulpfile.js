// Plugins
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cache = require('gulp-cache')
	cleancss = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	sass = require('gulp-ruby-sass')

// Compile all the styles
gulp.task('styles', function() {
	return sass('scss/bootstrap.scss', { style: 'expanded' })
		.pipe(autoprefixer('last 3 versions'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cleancss())
		.pipe(gulp.dest('dist/css/'))
		.pipe(notify({ message: 'Styles task complete' }));
});

// Images
gulp.task('images', function() {
	return gulp.src('images/**')
		.pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({plugins: [{removeViewBox: true}]})
		]))
		.pipe(gulp.dest('dist/images/'))
		.pipe(notify({ message: 'Images task complete' }));
});

// Watch for updates; compile on save
gulp.task('watch', function() {
	// Watch SCSS files
	gulp.watch('scss/**/*.scss', ['styles']);
	// Watch image files
	gulp.watch('images/**', ['images']);
});
