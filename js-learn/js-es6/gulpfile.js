var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("./js/es6.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/js"));
});