/**
 *   COMMON COMMANDS
 *   gulp                   Builds CSS and JS
 *   gulp build             Builds CSS and JS, same as gulp
 *   gulp watch             Starts BrowserSync on localhost:3000 (COMING SOON)
 *   gulp styles            Builds CSS
 *   gulp scripts           Build JS
 **/

//SETUP
var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var notify = require('gulp-notify');
// var browserSync = require('browser-sync').create();
// var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
sass.compiler = require('node-sass');

//CONFIGS
var projectURL = 'http://test-server:8000/'; //Change to your local dev server url
var paths = {
	styles: {
		src: 'src/styles/styles.scss', //entry point
		dest: 'assets/styles/' //exit point
	},
	scripts: {
		src: 'src/scripts/*.js', //entry point
		dest: 'assets/scripts/' //exit point
	}
};

//TASKS

//Styles Task
gulp.task('styles', function() {
	return gulp
		.src(paths.styles.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(csso())
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(
			notify({
				message: 'Styles task complete'
			})
		);
});

//Scripts Task
gulp.task('scripts', function() {
	return (
		gulp
			.src(paths.scripts.src)
			// .pipe(babel()) //es6 coming soon
			.pipe(uglify())
			.pipe(concat('main.min.js'))
			.pipe(gulp.dest(paths.scripts.dest))
			.pipe(
				notify({
					message: 'Scripts task complete'
				})
			)
	);
});

//Default Task
// gulp.task('default', ['styles', 'scripts']);

//Build Task
// gulp.task('build', ['styles', 'scripts']);

//watch task coming soon
//watch task
// gulp.task('watch', function() {
// 	browserSync.init({
// 		proxy: projectURL //change to project's local url
// 	});
// 	gulp.watch('src/css/**/*.scss', ['styles']);
// });
