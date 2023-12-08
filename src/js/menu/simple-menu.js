
// Меню бургер
const burgerBtn = document.querySelector(".menu__icon"); // Класс кнопки бургер
// const menuMobile = document.querySelector(".menu"); // Класс nav меню

if (burgerBtn) {
    const menuMobile = document.querySelector(".menu"); // Класс nav меню
    
    burgerBtn.addEventListener("click", (e) => {
        document.body.classList.toggle("lock"); // Блокировка прокрутки
        burgerBtn.classList.toggle("mobile-active"); // Класс на кнопку бургер
        menuMobile.classList.toggle("mobile-active"); // Класс на меню
    });
}

// Прокрутка при клике на пункт меню
const menuLinks = document.querySelectorAll(".menu__link[data-link]"); // Все дата атрибуты
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick); // Навешиваем обработчик на дата атрибуты
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target; // На какой пункт меню кликнули
        if (menuLink.dataset.link && document.querySelector(menuLink.dataset.link)) {
            const linkBlock = document.querySelector(menuLink.dataset.link); // Конкретный дата атрибут
            const linkBlockValue = linkBlock.getBoundingClientRect().top + pageXOffset - document.querySelector('header').offsetHeight; // Значение на которое надо прокрутить минус высота header

            window.scrollTo({ // Прокрутка с верху
                top: linkBlockValue,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    }
}