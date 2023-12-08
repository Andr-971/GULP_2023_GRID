import * as nodePath from "path";
import gulp from "gulp";
import { configFTP } from "../config/ftp.js";
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";
import { ftp } from "../config/config.js";
// Получаем имя папки проекта
const rootFolder = nodePath.basename(nodePath.resolve());

export const ftpSending = () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);
    return gulp
        .src("dist/**/*.*", {})
        .pipe(ftpConnect.dest(`/${ftp}/${rootFolder}`));
};
