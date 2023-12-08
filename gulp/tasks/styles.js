import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import sourcemaps from "gulp-sourcemaps"; // Карта файлов
import cleanCss from "gulp-clean-css"; // Сжатие CSS файлов
import webpcss from "gulp-webpcss"; // Вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группировка медиа запросов
import uncss from "gulp-uncss"; // Удаление не существующих классов


const sass = gulpSass(dartSass);

export const stylesDev = () => {
    return (
        gulp
            .src(["src/scss/style.scss"], {})
            .pipe(app.plugins.replace(/@img\//g, "../img/"))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(sourcemaps.write("."))
            // .pipe(rename({ extname: ".css" }))
            .pipe(gulp.dest("dist/css/"))
    );
}

export const stylesBul = () => {
    return gulp
        .src(["src/scss/style.scss"], { sourcemaps: true })
        .pipe(app.plugins.replace(/@img\//g, "../img/"))
        .pipe(sass())
        .pipe(
            uncss({
                html: ["index.html", "src/**/*.html", "http://example.com"],
            })
        )
        .pipe(groupCssMediaQueries())
        .pipe(
            webpcss({
                webpClass: ".webp",
                noWebpClass: ".no-webp",
            })
        )
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true,
            })
        )
        .pipe(gulp.dest("dist/css/"));
    
}

export const stylesMin = () => {
    return gulp
        .src(["src/scss/style.scss"], { sourcemaps: true })
        .pipe(app.plugins.replace(/@img\//g, "../img/"))
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(
            uncss({
                html: ["index.html", "src/**/*.html", "http://example.com"],
            })
        )
        .pipe(groupCssMediaQueries())
        .pipe(
            webpcss({
                webpClass: ".webp",
                noWebpClass: ".no-webp",
            })
        )
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true,
            })
        )
        .pipe(cleanCss({ level: 2 }))
        .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest("dist/css/"));
}
