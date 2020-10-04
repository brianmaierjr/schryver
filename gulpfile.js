const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

//compile scss into css
function style() {
    return gulp.src('src/scss/**/*.scss') //gets all files ending with .scss in src/scss
    .pipe(sass().on('error',sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('src/css'))
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index: "/index.html"
        }
    });
    gulp.watch('src/scss/**/*.scss', style);
    gulp.watch('src/*.html').on('change',browserSync.reload);
}

exports.style = style;
exports.watch = watch;