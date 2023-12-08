
/** Инициализация swiper */
new Swiper(".swiper", {
    /*
     * Настройки:
     * Включение/отключение:
     */
    /* Перетаскивание на ПК */
    simulateTouch: true,
    /* Чуствительность свойства*/
    touchRatio: 1, // 0 - отключено
    /* Угол срабатывания свойства/перетаскивания */
    touchAngle: 45,
    /* Курсор перетаскивания */
    grabCursor: true,
    /* Переключение при клике на слайд */
    slideToClickedSlide: true,
    /* Навигация по кешу */
    hashNavigation: {
        /* Отслеживать состояние */
        watchState: true,
    },
    /* Управление клавиатурой */
    keyboard: {
        /* Включить/выключить */
        enabled: true,
        /* Включить/выключить только тогда когда слайдер в пределах вьюпорта */
        onlyInViewport: true,
        /* Включить/выключить управление клавишами pageUp, pageDown */
        pageUpDown: true,
    },
    /* Управление колесом мыши */
    mousewheel: {
        /* Чуствительность колеса мыши */
        sensitivity: 1,
        /* Класс объекта на котором будет срабатывать прокрутка мышью */
        eventsTarget: ".swiper",
    },
    /* Автовысота */
    autoHeight: true,
    /* Колличество слайдов для показа */
    slidesPerView: 1,
    /* Отключение функционала если слайдов меньше чем slidesPerView */
    watchOverflow: true,
    /* Отступ между слайдами */
    spaceBetween: 0,
    /* Колличество пролистываемых слайдов */
    slidesPerGroup: 1,
    /* Активный слайд по центру */
    centeredSlides: true,
    /* Стартовый слайд */
    initialSlide: 0,
    /* Мультирядность */
    slidesPerColumn: 1,
    /* Бесконечный слайдер */
    loop: false,
    /* Колличество дублирующих слайдов */
    loopedSlides: 3,
    /* Свободный режим */
    // freeMode: true,
    /* Автопрокрутка */
    autoplay: {
        /* Пауза между прокруткой */
        delay: 2000,
        /* Закончить на последнем слайде */
        stopOnlastSlide: true,
        /* Отключить после ручного переключения */
        disableOnInteraction: false,
    },
    /* Скорость */
    speed: 800,
    /* Вертикальный слайдер */
    // direction: "vertical",

    /* Эффект переключения слайдов, по умолчанию slide листание, смена прозрачности fade, переворот flip,
    куб cube, эффект потока coverFlow */
    effect: "slide",
    /* Дополнение к fade */
    fadeEffect: {
        /* Паралельная смена прозрачности */
        crossFade: true,
    },
    /* Дополнение к flip */
    flipEffect: {
        /* тень */
        slideShadows: true,
        /* Показ только активного слайда */
        limitRotation: true,
    },
    /* Дополнение к cube */
    cubeEffect: {
        /* Настройка тени */
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    /* Дополнение к coverFlow */
    coverFlowEffect: {
        /* Угол */
        rotate: 20,
        /* Наложение */
        stretch: 50,
        /* Тень */
        slideShadows: true,
    },
    /* Брейк поинты (адаптив) ширина экрана и (сочетание сторон) */
    breakpointers: {
        //('@0.75':)
        320: {
            slidesPerView: 1,
        },
        //('@1.00':)
        480: {
            slidesPerView: 2,
        },
        //('@1.50':)
        992: {
            slidesPerView: 3,
        }
    },
    /* Отключить предзагрузку картинок */
    // preloadImages: false,
    // Lazy Loadding
    /* (подгрузка картинок) */
    lazy: {
        // Подгружать на старте, переключение слайда
        loadOnTransitionStart: false,
        // Подгружать предыдущую и следующую картинку
        loadPrevNext: false,
    },
    /* Слежка за видимыми слайдами */
    watchSlidesProgess: true,
    /* Добавление класса видимым слайдам */
    watchSlidesVisibility: true,
    /* Зум(увеличение картинки) */
    zoom: {
        // Максимальное увеличение
        maxRatio: 2,
        // Минимальное увеличение
        minRatio: 1,
    },
    /* Миниатюры (превью) */
    thumbs: {
        // Swiper с миниатюрами и его настройки
        Swiper: {
            el: "image-mini-slider", // Класс миниатюры
            slidesPerView: 2,
        }
    },

    /*
     * Стрелки:
     */
    // navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    // },
    /*
     * Навигация:
     * Буллеты(кружки), текущее положение, прогрессбар
     */
    pagination: {
        el: ".swiper-pagination",
        /*
         * Буллеты(кружки, квадратики)
         */
        // type: "bullets",
        // clickable: true,
        /* Динамические буллеты */
        dynamicBullets: false,
        /* Кастомные буллеты */
        // renderBullet: function (index, className) {
        //     return '<span class="' + className + '">' + (index + 1) + "</span>";
        // },
        /*
         * Фракции(нумерация из скольких)
         */
        type: "fraction",
        /*Кастомные фракции*/
        renderFraction: function (currentClass, totalClass) {
            return (
                '<span class="fr-text">Слайд:  </span>' +
                '<span class="' +
                currentClass +
                '"></span>' +
                '<span class="fr-text">  из  </span>' +
                '<span class="' +
                totalClass +
                '"></span>'
            );
        },
        /*
         * Прогрессбар
         */
        // type: "progressbar",
    },
    /*
     * Скрол:
     */
    // scrollbar: {
    //     el: ".swiper-scrollbar",
    //     draggable: true,
    // }
});