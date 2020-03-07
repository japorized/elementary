const gulp = require("gulp");
const sass = require("gulp-sass");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const log = require("gulplog");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync");
const babel = require("gulp-babel");

gulp.task("sass", done => {
  gulp
    .src("./src/sass/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./assets/css"));
  done();
});

gulp.task("uglify", () => {
  gulp
    .src("./src/js/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./src/babel"));

  const b = browserify({
    entries: "./src/babel/index.js",
    debug: true
  });

  return b
    .bundle()
    .pipe(source("index.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("./assets/js"));
});

gulp.task(
  "browser-sync",
  gulp.series(["sass", "uglify"], done => {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
    gulp.watch(["./index.html", "./assets/**/*"], cb => {
      browserSync.reload();
      cb();
    });
    done();
  })
);

gulp.task("watcher", () => {
  gulp.watch(["./src/sass/**/*.scss"], gulp.series("sass"));
  gulp.watch(["./src/js/**/*.js"], gulp.series("uglify"));
});

gulp.task("build", gulp.series(["sass", "uglify"]));
gulp.task("watch", gulp.series(["browser-sync", "watcher"]));
gulp.task("default", gulp.series(["watch"]));
