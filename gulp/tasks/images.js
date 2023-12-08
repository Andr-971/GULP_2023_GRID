import gulp from "gulp";
import webp from "gulp-webp"; // Конвектор в webp
import svgSprite from "gulp-svg-sprite"; // Конвектор в spriteSVG
import imagemin from "gulp-imagemin"; // Сжатие картинок
import newer from "gulp-newer"; // Проверка на обработку файлов
import { nameSprite } from "../config/config.js";

export const imgCOMP = () => {
    return gulp
        .src(["src/img/**/*.{jpg,jpeg,png,gif,webp}"])
        .pipe(newer("dist/img/"))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 4, // 0 to 7
            })
        )
        .pipe(gulp.dest("dist/img/"));
};

export const imgWEBP = () => {
    return gulp
        .src(["src/img/**/*.{jpg,jpeg,png,gif,webp}"])
        .pipe(newer("dist/img/"))
        .pipe(webp())
        .pipe(gulp.dest("dist/img/webp/"));
}

export const imgSVG = () => {
    return gulp
        .src(["src/img/svgSprite/*.svg"])
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: `${nameSprite}.svg`,
                        example: true,
                    },
                },
            })
        )
        .pipe(gulp.dest("dist/img/"));
}
