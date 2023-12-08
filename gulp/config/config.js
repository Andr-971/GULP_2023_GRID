
export const nameFileJS = "allScript.js"; // Сжатие файла js
export const nameSprite = "sprite"; // Выберите название sprite файла SVG
export const allScript = "allScript.js"; // Название объединённого файла js
export const ftp = "public_html"; // Название папки на сервере куда выгрузить проект
// Какие файлы объединять
export const joinScriptFile = [
    "src/js/source/main.js",
    "src/js/source/menu.js",
]
// Какие файлы и папки переместить из src/copy и куда в dist
export const pathFiles = "css/"; //

// Настройки smart-grid библиотеки миксинов
export const settingsSmatrGrid = {
    outputStyle: "scss" /* less || scss || sass || styl */,
    columns: 12 /* Количество столбцов сетки число 12*/,
    offset: "24px" /* растояние между столбцами сетки width px || % строка 24px*/,
    mobileFirst: false /* MobileFirst ? 'min-width' : 'max-width' */,
    container: {
        maxWidthScreen:
            "1920" /* Максимальная ширина экрана для адаптива число 1920*/,
        minWidthScreen:
            "390" /* Минимальная ширина экрана для адаптива число 390*/,
        maxWidthAdaptive:
            "1440" /* Максимальная ширина полотна для адаптива число 1440*/,

        maxWidth:
            "1440px" /* max-width о очень большой экран, расстояние контентного полотна строка 1440px*/,
        fields: "35px" /* боковые поля полотна width px || %  строка 35px*/,
    },
    breakPoints: {
        xlg: {
            width: "1366px" /* -> @media (max-width: 1366px) строка*/,
        },
        lg: {
            width: "1280px" /* -> @media (max-width: 1280px) строка*/,
        },
        md: {
            width: "1024px" /* -> @media (max-width: 1024px) строка*/,
            fields: "24px" /* боковые поля полотна width px || %  строка 24px*/,
        },
        sm: {
            width: "768px" /* -> @media (max-width: 768px) строка*/,
        },
        xs: {
            width: "560px" /* -> @media (max-width: 560px) строка*/,
        },
        xxs: {
            width: "390px" /* -> @media (max-width: 390px) строка*/,
        },
        /* 
        Мы можем создать любое количество точек разрыва.

        некоторое_имя: {
            width: 'Npx',
            fields/поля: 'N(px|%|rem)',
            offset/ компенсировать: 'N(px|%|rem)'
        }
        */
    },
};

