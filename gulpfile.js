// Основной модуль
import gulp from "gulp";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";
// Передаём значения в глобальную переменную
global.app = {
    gulp: gulp,
    plugins: plugins,
};

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { smart_grid } from "./gulp/tasks/smart_grid.js";
import { htmlDev, htmlBul } from "./gulp/tasks/html.js";
import { delSmGrid, delHtml, delCss, delJs } from "./gulp/tasks/delete.js";
import { stylesDev, stylesBul, stylesMin } from "./gulp/tasks/styles.js";
import {
    scriptES6,
    scriptES5,
    scriptCompress,
    scriptJoin,
} from "./gulp/tasks/script.js";
import { imgCOMP, imgWEBP, imgSVG } from "./gulp/tasks/images.js";
import {
    convFontsTTF,
    convFontsWOFF,
    convFontsWOFF2,
    fontStyle,
} from "./gulp/tasks/fonts.js";
import { server } from "./gulp/tasks/server.js";
import { zipArchive } from "./gulp/tasks/zip.js"; 
import { ftpSending } from "./gulp/tasks/ftp.js";

gulp.task("copy", copy);
gulp.task("scriptJoin", scriptJoin);
gulp.task("htmlDev", htmlDev);
gulp.task("htmlBul", htmlBul);
gulp.task("delCss", delCss);
gulp.task("delJs", delJs);
gulp.task("stylesDev", stylesDev);
gulp.task("stylesBul", stylesBul);
gulp.task("stylesMin", stylesMin);
gulp.task("scriptES6", scriptES6);
gulp.task("scriptES5", scriptES5);
gulp.task("imgCOMP", imgCOMP);
gulp.task("imgWEBP", imgWEBP);
gulp.task("imgSVG", imgSVG);
gulp.task("convFontsTTF", convFontsTTF);
gulp.task("convFontsWOFF", convFontsWOFF);
gulp.task("convFontsWOFF2", convFontsWOFF2);
gulp.task("fontStyle", fontStyle);
gulp.task("zip", zipArchive);
gulp.task("ftp", ftpSending);
gulp.task("scriptComp", scriptCompress);


function watcher() {
    gulp.watch("src/**/*.html", htmlDev);
    gulp.watch("src/**/*.scss", stylesDev);
}
function watcherScriptES6() {
    gulp.watch("src/**/*.js", scriptES6);
}
function watcherScriptES5() {
    gulp.watch("src/**/*.js", scriptES5);
}

const smartGrid = gulp.series(delSmGrid, smart_grid); // Создание smart-grid файла

const fontRequest = gulp.series(convFontsTTF,convFontsWOFF,convFontsWOFF2,fontStyle); // Создание и подключение шрифтов

const imagesRes = gulp.series(imgWEBP, imgCOMP); // Создание webp изображений, сжатие файлов изображений

const dev = gulp.series(delHtml, htmlDev, stylesDev, gulp.parallel(watcher, server)); // Режим разработки по вёрстке(оптимальное кол-во плагинов)

const devJsStyle = gulp.series(
    delHtml,
    htmlDev,
    delCss,stylesDev,
    delJs,
    scriptES5,
    gulp.parallel(watcher, watcherScriptES5, server)
); // Режим разработки по вёрстке(оптимальное кол-во плагинов) и js

const build = gulp.series(delHtml, htmlBul, delCss, stylesBul); // Завершение работы по вёрстке(максимальное кол-во плагинов)

const devScriptES6 = gulp.series(scriptES6, gulp.parallel(watcherScriptES6, server)); // Режим работы с jsES6
const devScriptES5 = gulp.series(scriptES5, gulp.parallel(watcherScriptES5, server)); // Режим работы с jsES5

gulp.task("smartGrid", smartGrid); // Запуск smart-grid файла(gulp smart-grid)
gulp.task("default", dev); // Задачи по дефолту работы по вёрстке(gulp)(оптимальное кол-во плагинов)
gulp.task("bul", build); // Запуск завершение работы по вёрстке(gulp bul)(максимальное кол-во плагинов)
gulp.task("d", devJsStyle); // Запуск задач для вёрстки и js (минимальное)

gulp.task("dev-scriptES6", devScriptES6); // Запуск работ по работе с jsES6
gulp.task("dev-scriptES5", devScriptES5); // Запуск работ по работе с jsES5

gulp.task("img-res", imagesRes); // Запуск работы webp изображений, сжатие файлов изображений
gulp.task("copy-file", copy); // Сопирование файлов

gulp.task("connect-fonts", fontRequest); // Запуск создания и подключения шрифтов

// Экспорт задач для запуска в терминале с npm run
export { imgSVG };
export { smartGrid };
export { dev };
export { build };
export { devScriptES6 };
export { devScriptES5 };
export { imagesRes };
export { fontRequest };
export { zipArchive };
export { ftpSending };
export { scriptCompress };
export { scriptJoin };
export { copy };