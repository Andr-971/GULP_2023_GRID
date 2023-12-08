import gulp from 'gulp';
// import webpack from "webpack";
// import gulpWebpack from "webpack-stream";
import webpack from "webpack-stream";
import uglify from "gulp-uglify"; // Сжатие js файлов
import rename from "gulp-rename";
import concat from "gulp-concat";
import { nameFileJS, joinScriptFile, allScript } from "../config/config.js";

export const scriptES6 = () => {
    return gulp
        .src(["src/js/main.js"], {
            sourcemaps: true,
        })
        .pipe(
            webpack({
                mode: "development",
                devtool: "inline-source-map", //Отлаживать Инструмент Отображать
                output: {
                    filename: "main.js",
                },
            })
        )
        .pipe(gulp.dest("dist/js/"));
};

export const scriptES5 = () => {
    return gulp
        .src(["src/js/source/**/*.js"], { sourcemaps: true })
        .pipe(gulp.dest("dist/js/"));
};

export const scriptCompress = () => {
    return gulp
        .src([`src/js/source/${nameFileJS}`], {})
        .pipe(uglify())
        .pipe(
            rename({
                // dirname: "main/text/ciao",
                // basename: "aloha",
                // prefix: "bonjour-",
                suffix: ".min",
                // extname: ".min.js",
            })
        )
        .pipe(gulp.dest("dist/js/"));
};

export const scriptJoin = () => {
    return gulp
        .src(joinScriptFile, {})
        .pipe(concat(allScript))
        .pipe(gulp.dest("src/js/"));
};