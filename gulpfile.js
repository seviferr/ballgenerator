var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var concat = require('gulp-concat');
var browser = require('browser-sync');
var reload = browser.reload;

/////////////////////////////////////
// script-task
/////////////////////////////////////
gulp.task('scripts', function () {
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
    .pipe(plumber())
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(reload({stream: true}));
});

/////////////////////////////////////
// css-task
/////////////////////////////////////
gulp.task('sass', function () {
  gulp.src('./app/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browser: ['last 3 versions'],
        cascade: false}))
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./app/css'))
    .pipe(reload({stream: true}));
});


/////////////////////////////////////
// browser-task
/////////////////////////////////////
//html
gulp.task('html',function () {
    gulp.src('app/**/*.html')
    .pipe(reload({stream: true}));
})
//browser
gulp.task('browser',function () {
    browser({
        server:{
            baseDir: './app/'
        }
    })
})

/////////////////////////////////////
// WATCH-task
/////////////////////////////////////
gulp.task('watch', function () {
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('./app/scss/**/*.scss', ['sass']);
    gulp.watch('./app/**/*.html', ['html']);
});


/////////////////////////////////////
// BUILD-task
/////////////////////////////////////
// CLEAR BUILD-FOLDER
gulp.task('build:clear', function(cb){
    del([
        'build/**'
    ],cb);
});

// COPY
gulp.task('build:copy',['build:clear'], function(){
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build'))
});

// FILTER UNWANTED BUILD-FILES
gulp.task('build:filter',['build:copy'], function(cb){
    del([
        'build/scss/',
        'build/js/!(*.min.js)'
    ],cb)
});

gulp.task('build', ['build:copy','build:filter'])


/////////////////////////////////////
// Default task
/////////////////////////////////////
gulp.task('default', ['scripts', 'sass', 'html', 'browser', 'watch'])
