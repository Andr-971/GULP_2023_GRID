import replace from "gulp-replace"; // Поиск и замена
import browsersync from "browser-sync"; // Сервер
import newer from "gulp-newer"; // Проверка на обработку файлов

// Экспортируем объект
export const plugins = {
    replace: replace,
    browsersync: browsersync,
    newer: newer
};
