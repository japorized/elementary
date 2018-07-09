const gulp = require('gulp'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      pump = require('pump'),
      browserSync = require('browser-sync');

gulp.task('sass', (done) => {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
  done();
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

gulp.task('browser-sync', gulp.series(['sass', 'uglify'], (done) => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['./index.html', './assets/**/*'], cb => {
    browserSync.reload();
    cb();
  });
  done();
}));

gulp.task('watcher', () => {
  gulp.watch(['./src/sass/**/*.scss'], gulp.series( 'sass' ));
  gulp.watch(['./src/js/**/*.js'], gulp.series( 'uglify' ));
});

gulp.task('build', gulp.series(['sass', 'uglify']));
gulp.task('watch', gulp.series( ['browser-sync', 'watcher'] ));
gulp.task('default', gulp.series( [ 'watch' ] ));
