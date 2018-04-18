const gulp = require('gulp'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      pump = require('pump'),
      gulpUtil = require('gulp-util'),
      browserSync = require('browser-sync');

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('uglify', (cb) => {
  try {
    pump([
        gulp.src('./src/js/**/*.js'),
        uglify({
          compress: {
            collapse_vars: true,
            toplevel: true
          }
        }),
        gulp.dest('./assets/js')
      ],
      cb
    );
  } catch (e) {
   console.log('gulp uglify: ' + e);
  }
});

gulp.task('browser-sync', ['sass', 'uglify'], () => {
  browserSync({
    server: {
      baseDir: './'
    }
  });
})

gulp.task('watcher', () => {
  gulp.watch(['src/sass/**/*.scss'], ['sass']);
  gulp.watch(['src/js/**/*.js'], ['uglify']);
  gulp.watch(['index.html', 'assets/**/*'], () => {browserSync.reload()});
});

gulp.task('build', ['sass', 'uglify']);
gulp.task('watch', ['browser-sync', 'watcher']);
gulp.task('default', [ 'watch' ]);
