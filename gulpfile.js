var gulp = require('gulp');
var sass = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var webserver = require('gulp-webserver');
var open = require('opn');
var inject = require('gulp-inject');
var angularFileSort = require('gulp-angular-filesort');
var execSync = require('child_process').execSync;
var path = require('path');

//TODO: json-server should take in a .json file to dynamically serve data stores

var DEV_PATHS = {
    BOWER: "public/assets/libs/bower_components",
    INDEX: "public/index.html",
    SASS: "public/assets/styles/scss/site.scss",
    STYLES: "public/assets/styles",
    DATA_STORE: path.join(process.cwd(), "public/assets/data"),
    SERVER: {
        DIR: "./server",
        FILE: "server/server.file"
    }
}

//******* Manage Bower packages ********//
gulp.task('bower:cleanout', function() {
    del([
            DEV_PATHS.BOWER + '/**',
            '!' + DEV_PATHS.BOWER
        ])
        .then(function() {
            console.log('Cleaned "bower_components"');
        });
})

gulp.task('bower:copy', ['bower:cleanout'], function() {
    gulp.src(mainBowerFiles())
        .pipe(gulp.dest(DEV_PATHS.BOWER));
    console.log('Bower files copied')
})

gulp.task('bower:inject', function() {
    var target = gulp.src(DEV_PATHS.INDEX);
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(
        [
            DEV_PATHS.BOWER + '/*.{js,css}'
        ], { read: false });

    return target
        .pipe(inject(sources))
        .pipe(gulp.dest('./public'));

    console.log('Bower dependencies injected.')
})

gulp.task('bower', ['bower:copy'], function() {
    console.log('Bower files synced');
})

//***** run json-server *******//
gulp.task('json-server', function(){
  var args = process.argv;
  var indexOfFileNameArg = -1;
  var dataFile = "";

  if(args.indexOf('--file') >= 0){
    indexOfFileNameArg = args.indexOf('--file') + 1;
    dataFile = "/" + args[indexOfFileNameArg];
  }
  execSync('json-server ' + DEV_PATHS.DATA_STORE + dataFile, {cwd: process.cwd(), stdio: [0, 1, 2]});

})
//******************************//

//****** Serve app *********//
var server = {
    host: 'localhost',
    port: '3001'
}

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            host: server.host,
            port: server.port,
            livereload: true,
            directoryListing: false,
            fallback: 'public/index.html'
        }));
});

gulp.task('openbrowser', function() {
    open('http://' + server.host + ':' + server.port);
});

gulp.task('serve', ['webserver', 'openbrowser'], function() {
    console.log("Serving app...");
});


//******* Sass ******************//
gulp.task('sass', function() {
    gulp.src(DEV_PATHS.SASS)
        .pipe(sass())
        .pipe(gulp.dest(DEV_PATHS.STYLES))
});


//****** Build script **********//
gulp.task('injectAppFiles', function() {
    var gulpSrc = ['public/app/**/*.js', 'public/app/*.js'];

    return gulp.src(DEV_PATHS.INDEX)
        .pipe(inject(gulp.src(gulpSrc, { read: false }), { starttag: '<!-- inject:appfiles:{{ext}} -->' }))
        .pipe(gulp.dest('./public'));

    console.log('Project files injected.')
});



//****** Build script **********//

var PATHS = {
    SRC: ['public/**', 'public/app', 'public/assets', 'public/index.html'],
    PUBLIC: "C:/Users/Admin/Desktop/Nacarat/public",
    SERVER: {
        DIR: "C:/Users/Admin/Desktop/Nacarat/server",
        FILE: "C:/Users/Admin/Desktop/Nacarat/server/server.file"
    }
}

gulp.task('build:copyServer', function() {
    gulp.src('server/server.js')
        .pipe(gulp.dest(PATHS.SERVER.DIR))
})

gulp.task('build:cleanPublic', ['build:copyServer'], function() {
    console.log("DELETE")
    del([
            PATHS.PUBLIC + '/**',
            '!' + PATHS.PUBLIC,
            PATHS.SERVER.FILE
        ], { force: true })
        .then(function(paths) {
            console.log('Cleaned "Public" files');
        });
})

gulp.task('build:copyFiles', ['build:cleanPublic'], function() {
    gulp.src(PATHS.SRC)
        .pipe(gulp.dest(PATHS.PUBLIC))
})

gulp.task('build', ['build:copyFiles'], function() {
    console.log('Build process complete');
})
