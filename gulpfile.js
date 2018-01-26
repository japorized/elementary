const gulp = require('gulp'),
      sass = require('gulp-sass'),
      gulpUtil = require('gulp-util');

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});
