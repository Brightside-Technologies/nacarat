var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require("del");
var path = require("path");
var gutil = require("gulp-util");
var _ = require("underscore");

var DEV_PATHS = {
  INDEX: "www/index.html",
  SASS: "www/assets/styles/scss/site.scss",
  STYLES: "www/assets/styles",
  DIST: "dist"
};

gulp.task("sass", function() {
  gulp
    .src(DEV_PATHS.SASS)
    .pipe(sass())
    .pipe(gulp.dest(DEV_PATHS.STYLES));
});

gulp.task("dist:cleanout", function() {
  del([DEV_PATHS.DIST + "/**", "!" + DEV_PATHS.DIST]).then(function(paths) {
    gutil.log(gutil.colors.bgRed("Deleted"), paths.join("\n"));
  });
});
