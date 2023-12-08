
import * as nodePath from "path";
import gulp from "gulp";
import zip from "gulp-zip";
import { delZip } from "./delete.js";
// Получаем имя папки проекта
const rootFolder = nodePath.basename(nodePath.resolve());

export const zipArchive = () => {
    delZip();
    return gulp
        .src(["dist/**/*.*"])
        .pipe(zip(`${rootFolder}.zip`))
        .pipe(gulp.dest("./"));
};
