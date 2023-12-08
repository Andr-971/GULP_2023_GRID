import gulp from "gulp";
import fileinclude from "gulp-file-include";
import version from "gulp-version-number";
import webphtml from "gulp-webp-html-nosvg";
import replace from "gulp-replace"; // Поиск и замена

export const htmlDev = () => {
    return (
        gulp
            .src(["src/*.html"])
            .pipe(fileinclude())
            .pipe(replace(/@img\//g, "img/"))
            .pipe(gulp.dest("dist/"))
            // .pipe(app.plugins.browsersync.stream())
    );
};

export const htmlBul = () => {
    return (
        gulp
            .src(["src/*.html"])
            .pipe(fileinclude())
            .pipe(replace(/@img\//g, "img/"))
            .pipe(
                version({
                    value: "%DT%",
                    append: {
                        key: "_v",
                        cover: 0,
                        to: ["css", "js"],
                    },
                    output: {
                        file: "gulp/version.json",
                    },
                })
            )
            .pipe(webphtml())
            .pipe(gulp.dest("dist/"))
            // .pipe(app.plugins.browsersync.stream())
    );
};
