// gulpfile.mjs
import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';

const sass = gulpSass(dartSass);


// Task para JS
export function scripts() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

// Task para SCSS
export function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))       // compila SCSS
        .pipe(cleanCSS())                               // minifica de verdade
        .pipe(gulp.dest('./dist/css'));
}

// Task para imagens
export function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

// Task padrão
export default gulp.parallel(styles, scripts, images);

// Task watch
export function watch() {
    gulp.watch('./src/styles/*.scss', styles);
    gulp.watch('./src/scripts/*.js', scripts);
}
