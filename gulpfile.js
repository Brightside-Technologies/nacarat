var gulp = require('gulp');
var bowerJson = require('./bower.json');
var sass = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var webserver = require('gulp-webserver');
var open = require('opn');
var inject = require('gulp-inject');
var angularFileSort = require('gulp-angular-filesort');
var execSync = require('child_process').execSync;
var path = require('path');

var gutil = require('gulp-util');
var tap = require('gulp-tap');
var _ = require("underscore");

var DEV_PATHS = {
  BOWER_DIR: "bower_components",
  BOWER: "www/assets/libs/bower",
  INDEX: "www/index.html",
  SASS: "www/assets/styles/scss/site.scss",
  STYLES: "www/assets/styles",
  DATA_STORE: path.join(process.cwd(), "www/assets/data"),
  DIST: "dist"
};


/**********************************/
/******** JSON-SERVER *************/
/**********************************/
gulp.task('json-server', function() {
  var args = process.argv;
  var indexOfFileNameArg = -1;
  var dataFile = "";

  if (args.indexOf('--file') >= 0) {
    indexOfFileNameArg = args.indexOf('--file') + 1;
    dataFile = "/" + args[indexOfFileNameArg];
  }
  execSync('json-server ' + DEV_PATHS.DATA_STORE + dataFile, {
    cwd: process.cwd(),
    stdio: [0, 1, 2]
  });

});
/**********************************/
/******** END JSON-SERVER *********/
/**********************************/



/*****************************/
/************ SASS ***********/
/*****************************/
gulp.task('sass', function() {
  gulp.src(DEV_PATHS.SASS)
    .pipe(sass())
    .pipe(gulp.dest(DEV_PATHS.STYLES));
});
/******************************/
/*********** END SASS *********/
/******************************/

gulp.task('dist:cleanout', function() {
  del([DEV_PATHS.DIST + "/**", "!" + DEV_PATHS.DIST])
    .then(function(paths) {
      gutil.log(gutil.colors.bgRed('Deleted'), paths.join('\n'));
    });
})
