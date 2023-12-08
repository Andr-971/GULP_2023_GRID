import gulp from "gulp";
import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const convFontsTTF = () => {
    return (
        gulp
            .src(["src/fonts/*.{otf,eot}"], {})
            // Конвентируем .ttf
            .pipe(
                fonter({
                    formats: ["ttf"],
                })
            )
            // Выгужаем в исходную папку
            .pipe(gulp.dest("src/fonts/"))
    );
};

export const convFontsWOFF = () => {
    return (
        gulp
            .src(["src/fonts/*.ttf"], {})
            // Конвентируем .woff
            .pipe(
                fonter({
                    formats: ["woff"],
                })
            )
            // Выгужаем в папку с результатом
            .pipe(gulp.dest("dist/fonts/"))
    );
};

export const convFontsWOFF2 = () => {
    return (
        gulp
            .src(["src/fonts/*.ttf"], {})
            // Конвентируем .woff2
            .pipe(ttf2woff2())
            // Выгужаем в папку с результатом
            .pipe(gulp.dest("dist/fonts/"))
            .pipe(gulp.src(["src/fonts/*.{woff,woff2}"], {}))
            // Выгружаем в папку с результатом
            .pipe(gulp.dest("dist/fonts/"))
    );
};

export const fontStyle = () => {
    // Файл стилей подключения шрифтов
    let fontsFile = "./src/scss/config/fonts.scss";
    // Проверяем существуют ли файлы шрифтов
    fs.readdir("./dist/fonts/", function (err, fontsFiles) {
        if (fontsFiles) {
            // Проверяем существует ли файл стилей для подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                // Если файла нет, создаем его
                fs.writeFile(fontsFile, "", cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    // Записываем подключения шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split(".")[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split("-")[0]
                            ? fontFileName.split("-")[0]
                            : fontFileName;
                        let fontWeight = fontFileName.split("-")[1]
                            ? fontFileName.split("-")[1]
                            : fontFileName;

                        if (fontWeight.toLowerCase() === "thin") {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === "extralight") {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === "light") {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === "medium") {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === "semibold") {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === "bold") {
                            fontWeight = 700;
                        } else if (
                            fontWeight.toLowerCase() === "extrabold" ||
                            fontWeight.toLowerCase() === "heavy"
                        ) {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === "black") {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }

                        fs.appendFile(
                            fontsFile,
                            `@font-face {
                font-family: ${fontName};
                font-display: swap;
                src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                font-weight: ${fontWeight};
                font-style: normal;
                }\r\n`,
                            cb
                        );
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // Если файл есть нужно его удалить
                console.log(
                    "Файл scss/config/fonts.scss уже существует. Для обновления файла нужно его удалить!"
                );
            }
        }
    });

    return gulp.src(`src/`);
    function cb() {}
};
