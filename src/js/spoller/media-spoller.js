
'use strict';

// Получение споллеров на странице
const spollersArray = document.querySelectorAll("[data-spollers]");

if (spollersArray.length > 0) {
    // Получение обычных споллеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных споллеров
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }
    // Получение споллеров с медиа запросом
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
        return item.dataset.spollers.split(",")[0];
    });
    // Инициализация споллеров с медиа запросом
    // if (spollersMedia.length > 0) {
    //     const breakpointsArray = [];
    //     spollersMedia.forEach(item => {
    //         const params = item.dataset.spollers;
    //         const breakpoints = {};
    //         const paramsArray = params.split(",");
    //         breakpoints.values = paramsArray[0];
    //         breakpoints.type = paramsArray[1] ? paramsArray[1].trim() : "max";
    //         breakpoints.item = item;
    //         breakpointsArray.push(breakpoints);
    //     });

    //     // Получаем уникальные брейкпоинты
    //     let mediaQueries = breakpointsArray.map(function (item) {
    //         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    //     });
    //     mediaQueries = mediaQueries.filter(function (item, index, self) {
    //         return self.indexOf(item) === index;
    //     });

    //     // Работаем с каждым брекпоинтом
    //     mediaQueries.forEach(breakpoint => {
    //         const paramsArray = breakpoint.split(",");
    //         const mediaBreakpoint = paramsArray[1];
    //         const mediaType = paramsArray[2];
    //         const matchMedia = window.matchMedia(paramsArray[0]);

    //         // Объекты с нужными условиями
    //         const spollersArray = breakpointsArray.filter(function (item) {
    //             if (item.value === mediaBreakpoint && item.type === mediaType) {
    //                 return true;
    //             }
    //         });
    //         // Событие
    //         matchMedia.addEventListener(function (e) {
    //             initSpollers(spollersArray, matchMedia);
    //         });
    //         initSpollers(spollersArray, matchMedia);
    //     });
    // }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener('click', setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener('click', setSpollerAction); 
            }
        });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true; // Переделать
                    }
                } else {
                    spollerTitle.setAttribute("tabindex", "-1");
                    spollerTitle.nextElementSibling.hidden = false; // Переделать
                }
            });
        }
    }
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollerBlock = spollerTitle.closest('[data-spoller]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollerTitle.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollerBody(spollerBlock);
                }
                spollerTitle.classList.toggle('_active');
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventsDefault();
        }
    }
    function hideSpollerBody(spollerBlock) {
        const spollerActiveTitle = spollerBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    } 
}

//=========================================================================================
// SladeToggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}