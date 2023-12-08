import gulp from "gulp";
import clean from "gulp-clean";

export const delSmGrid = () => {
    return gulp.src("src/smart-grid/smart-grid.scss").pipe(clean());
};

export const delHtml = () => {
    return gulp.src("dist/index.html").pipe(clean());
};

export const delCss = () => {
    return gulp.src("dist/css/style.css").pipe(clean());
};

export const delJs = () => {
    return gulp.src("dist/js/*.js").pipe(clean());
};

export const delZip = () => {
    return gulp.src("dist/**/*.zip").pipe(clean());
};
