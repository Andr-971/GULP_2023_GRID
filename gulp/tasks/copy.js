import gulp from "gulp"
import { pathFiles } from "../config/config.js";

export const copy = () => {
    return gulp
        .src(["src/copy/*.*"], { base: "src/copy" })
        .pipe(gulp.dest(`dist/${pathFiles}`));
}
