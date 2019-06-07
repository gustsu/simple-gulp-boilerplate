//SETUP
var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
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
//styles task
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

//scripts task
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

//watch task coming soon
//watch task
// gulp.task('watch', function() {
// 	browserSync.init({
// 		proxy: projectURL //change to project's local url
// 	});
// 	gulp.watch('src/css/**/*.scss', ['styles']);
// });
