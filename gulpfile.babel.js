/**
 *   COMMON COMMANDS
 *   gulp                   Builds CSS and JS
 *   gulp build             Builds CSS and JS, same as gulp
 *   gulp watch             Watches for changes and starts BrowserSync on localhost:3000 (COMING SOON)
 *   gulp styles            Builds CSS
 *   gulp scripts           Build JS
 **/

//SETUP
var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var notify = require('gulp-notify');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
sass.compiler = require('node-sass');
var browserSync = require('browser-sync').create();

//CONFIGS
var projectURL = 'http://test-server:8000/'; //change to your local dev server url
var paths = {
	styles: {
		src: 'src/styles/styles.scss', //entry point
		dest: 'dist/styles/', //exit point
		watch: 'src/styles/*.scss' //path to watch for changes
	},
	scripts: {
		src: 'src/scripts/*.js', //entry point
		dest: 'dist/scripts/', //exit point
		watch: 'src/scripts/*.js' //path to watch for changes
	}
};

//styles function
function styles() {
	return gulp
		.src(paths.styles.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(csso())
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(
			notify({
				message: 'Styles task complete'
			})
		);
}

//scripts function
function scripts() {
	return gulp
		.src(paths.scripts.src, { sourcemaps: true })
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(
			notify({
				message: 'Scripts task complete'
			})
		);
}

//watch function
function watch() {
	gulp.watch(paths.scripts.watch, scripts);
	gulp.watch(paths.styles.watch, styles);
}

//serve function
function serve() {
	//browserSync STUFF
	//projectURL STUFF
}

//build function
var build = gulp.parallel(styles, scripts);

//attach the functions to tasks
//You can use CommonJS `exports` module notation to declare tasks, more info here: https://github.com/gulpjs/gulp
exports.styles = styles;
exports.scripts = scripts;
exports.build = build;
exports.default = build;
exports.watch = watch;
