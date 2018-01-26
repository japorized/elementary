const gulp = require('gulp'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      pump = require('pump'),
      gulpUtil = require('gulp-util');

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('uglify', (cb) => {
  pump([
      gulp.src('./src/js/**/*.js'),
      uglify(),
      gulp.dest('./assets/js')
    ],
    cb
  );
})

gulp.task('uglify:watch', () => {
  gulp.watch('./src/js/**/*.js', ['uglify']);
})

gulp.task('build', ['sass', 'uglify']);
gulp.task('watch', ['sass:watch', 'uglify:watch']);
