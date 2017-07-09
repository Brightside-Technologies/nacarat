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
};


/*************************************/
/**************** BOWER *************/
/************************************/
function getBowerFiles(filter) {
    var bowerFiles = mainBowerFiles(filter).map(function (filePath, index, arr) {
        //Replace files by their minified version when possible
        // var newPath = filePath.replace(/.([^.]+)$/g, '.min.$1');
        // return exists(newPath) ? newPath : filePath;
        return filePath;
    });
    return bowerFiles;
}
gulp.task('bower:cleanout', function () {
    del([DEV_PATHS.BOWER_ROOT + "/**", "!" + DEV_PATHS.BOWER_ROOT])
        .then(function (paths) {
            gutil.log(gutil.colors.bgRed('Deleted'), paths.join('\n'));
        });
    del([DEV_PATHS.BOWER + "/**", "!" + DEV_PATHS.BOWER])
        .then(function (paths) {
            gutil.log(gutil.colors.bgRed('Deleted'), paths.join('\n'));
        });
});
gulp.task('bower:clean-project', function () {
    del.sync([DEV_PATHS.BOWER + "/**", "!" + DEV_PATHS.BOWER]);
    gutil.log(gutil.colors.bgRed('Cleaned out ' + DEV_PATHS.BOWER_ROOT));
});
gulp.task('bower:copy-components', ['bower:clean-project'], function () {
    var files = getBowerFiles();
    var bowerDependencies = _.keys(bowerJson.dependencies);
    gulp.src(files)
        .pipe(gulp.dest(function (file) {
            var dest = "";
            bowerDependencies.forEach(function (dep) {
                if (file.path.indexOf("\\" + dep + "\\") > 0) {
                    dest = DEV_PATHS.BOWER + "/" + dep;
                }
            });

            if(dest == "") {
              dest = DEV_PATHS.BOWER;
            }
            return dest;
        }))
        .pipe(tap(function (file, t) {
            gutil.log(gutil.colors.bgGreen('Added'),
                gutil.colors.bgCyan.black(path.basename(file.path)));
        }));
});
gulp.task('bower:main', ['bower:copy-components']);
gulp.task('bower', ['bower:main']);
/****************************************/
/*************** END BOWER *************/
/***************************************/



/**********************************/
/******** JSON-SERVER *************/
/**********************************/
gulp.task('json-server', function(){
  var args = process.argv;
  var indexOfFileNameArg = -1;
  var dataFile = "";

  if(args.indexOf('--file') >= 0){
    indexOfFileNameArg = args.indexOf('--file') + 1;
    dataFile = "/" + args[indexOfFileNameArg];
  }
  execSync('json-server ' + DEV_PATHS.DATA_STORE + dataFile, {cwd: process.cwd(), stdio: [0, 1, 2]});

});
/**********************************/
/******** END JSON-SERVER *********/
/**********************************/



/****************************/
/******** WEBSERVER *********/
/****************************/
var server = {
    host: 'localhost',
    port: '3001'
};

gulp.task('openbrowser', function() {
    open('http://' + server.host + ':' + server.port);
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            host: server.host,
            port: server.port,
            livereload: true,
            directoryListing: false,
            fallback: 'www/index.html'
        }));
});

gulp.task('serve', ['webserver', 'openbrowser'], function() {
    console.log("Serving app...");
});
/********************************/
/******** END WEBSERVER *********/
/********************************/



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














//****** Build script **********//
// gulp.task('injectAppFiles', function() {
//     var gulpSrc = ['www/app/**/*.js', 'www/app/*.js'];
//
//     return gulp.src(DEV_PATHS.INDEX)
//         .pipe(inject(gulp.src(gulpSrc, { read: false }), { starttag: '<!-- inject:appfiles:{{ext}} -->' }))
//         .pipe(gulp.dest('./www'));
// });



//****** Build script **********//

// var PATHS = {
//     SRC: ['www/**', 'www/app', 'www/assets', 'www/index.html'],
//     www: "C:/Users/Admin/Desktop/Nacarat/www",
//     SERVER: {
//         DIR: "C:/Users/Admin/Desktop/Nacarat/server",
//         FILE: "C:/Users/Admin/Desktop/Nacarat/server/server.file"
//     }
// };
//
// gulp.task('build:copyServer', function() {
//     gulp.src('server/server.js')
//         .pipe(gulp.dest(PATHS.SERVER.DIR))
// })
//
// gulp.task('build:cleanwww', ['build:copyServer'], function() {
//     console.log("DELETE")
//     del([
//             PATHS.www + '/**',
//             '!' + PATHS.www,
//             PATHS.SERVER.FILE
//         ], { force: true })
//         .then(function(paths) {
//             console.log('Cleaned "www" files');
//         });
// })
//
// gulp.task('build:copyFiles', ['build:cleanwww'], function() {
//     gulp.src(PATHS.SRC)
//         .pipe(gulp.dest(PATHS.www))
// })
//
// gulp.task('build', ['build:copyFiles'], function() {
//     console.log('Build process complete');
// })
