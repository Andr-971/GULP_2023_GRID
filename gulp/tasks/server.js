import browsersync from "browser-sync"; // Сервер

export const server = (done) => {
    browsersync.init({
        server: {
            baseDir: "./dist/",
        },
        notify: false,
        port: 3000,
    });
};
