const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const pump = require('pump');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');

gulp.task('sass', done => {
  gulp
    .src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
  done();
});

gulp.task('uglify', () => {
  try {
    return gulp
      .src('./src/js/**/*.js')
      .pipe(babel())
      .pipe(uglify())
      .pipe(gulp.dest('./assets/js'));
  } catch (e) {
    console.log('gulp uglify: ' + e);
  }
});

gulp.task(
  'browser-sync',
  gulp.series(['sass', 'uglify'], done => {
    browserSync.init({
      server: {
        baseDir: './',
      },
    });
    gulp.watch(['./index.html', './assets/**/*'], cb => {
      browserSync.reload();
      cb();
    });
    done();
  }),
);

gulp.task('watcher', () => {
  gulp.watch(['./src/sass/**/*.scss'], gulp.series('sass'));
  gulp.watch(['./src/js/**/*.js'], gulp.series('uglify'));
});

gulp.task('build', gulp.series(['sass', 'uglify']));
gulp.task('watch', gulp.series(['browser-sync', 'watcher']));
gulp.task('default', gulp.series(['watch']));
