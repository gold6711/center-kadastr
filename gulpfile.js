var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    webfont = require('gulp-webfont'),
    browserSync = require('browser-sync');

var webfont_config = {
    types:'eot,woff2,woff,ttf,svg',
    ligatures: true
};

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('app/sass/**/*.sass') //все sass из sass и доч
        .pipe(sass()) // Преобр Sass в CSS через gulp-sass
        .pipe(gulp.dest('app/css')) // Выгруж рез-та в app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем
});

gulp.task('pug', function(){ // Создаем таск "pug"
    return gulp.src('app/pug/**/*.pug')
        .pipe(pug()) // Преобразуем в html
        .pipe(gulp.dest('app/')) // Выгруж рез-та в app/pug
        .pipe(browserSync.reload({stream: true})) // Обновляем
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs',['sass'], function() {
    return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('font-aw', function(){
    return gulp.src('node_modules/font-awesome/**.*')
    .pipe(gulp.dest('app/libs/font-awesome/'));
});

gulp.task('default', function () {
    return gulp.src('test/*.svg')
        .pipe(webfont(webfont_config))
        .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'css-libs', 'pug', 'font-aw', 'scripts'], function() {
    gulp.watch('app/pug/**/*.pug', ['pug']);
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
