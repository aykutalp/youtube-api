var gulp = require('gulp');

var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps'); // It is used for concatenation scss files otherwise it does not work

/* CSS Settings */
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano'); //Minify CSS


gulp.task('clean', function() {
    return del(['css/style.min.css', 'js/script.min.js']);
});

gulp.task('scripts', function(){
  return gulp.src('assets/scripts/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('js/'));
});


gulp.task('sass', function(){
  return gulp.src('assets/scss/*.scss')
    .pipe(sourcemaps.init()) // It is used for concatenation scss files
    .pipe(sass({outputStyle: 'compressed'})) // expanded, compressed
    .pipe(autoprefixer({browsers: ['last 3 versions']}))
    .pipe(concat('style.css'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(cssnano()) // use sass compressed
    .pipe(sourcemaps.write('.')) // It is used for concatenation scss files
    .pipe(gulp.dest('css/'));
});


gulp.task('webserver', function(){
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});


gulp.task('watch', function(){
  gulp.watch('assets/scripts/**/*.js', ['scripts']);
  gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['clean'], function(){
  gulp.start('watch', 'scripts', 'sass', 'webserver');
});
