
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');//.create();
//var reload       = browserSync.reload;
var debug        = require('gulp-debug');

//import del from 'del';
//import {stream as wiredep} from 'wiredep';

gulp.task('sass', function () {
  return gulp.src('resources/assets/sass/styles.scss')
    .pipe(plumber())
    //.pipe($.sourcemaps.init())
    //.pipe(debug({title: 'sass files:'}))
    .pipe(sass({ 
      outputStyle: 'expanded', 
      precision: 10, 
      includePaths: [
        'vendor/bc/foundation-sites/scss',
        'vendor/bc/motion-ui/src'
      ]
    }).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    //.pipe($.sourcemaps.write())
    .pipe(gulp.dest('public/assets/css'))
    //.pipe(debug({title: 'css files:'}))
    .pipe(browserSync.stream());

    //console.log(stream);
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: 'public'
    });

    gulp.watch("resources/assets/sass/*.scss", ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

