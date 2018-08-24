var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var browserSync = require('browser-sync').create();

var config = {
  paths: {
    scss: './src/scss/**/*.scss',
    html: './public/index.html'
  },
  output: {
    path: './public',
    cssName: 'bundle.min.css'
  },
  isDevelop: true
}

gulp.task('scss', function () {
  return gulp.src(config.paths.scss)
    .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
    .pipe(sass())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(concat(config.output.cssName))
    .pipe(autoprefixer({
      browsers: ['last 20 version']
    }))
    .pipe(gulpIf(!config.isDevelop, csso()))
    .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
    .pipe(gulp.dest(config.output.path))
    .pipe(browserSync.stream())
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: config.output.path
    }
  });
  gulp.watch(config.paths.scss, ['scss']);
  gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', ['scss', 'serve']);
