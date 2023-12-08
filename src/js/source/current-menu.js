"use strict";
// Определение на каком устройстве открыта страница

const isMobileDevice = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobileDevice.Android() ||
            isMobileDevice.BlackBerry() ||
            isMobileDevice.iOS() ||
            isMobileDevice.Opera() ||
            isMobileDevice.Windows()
        );
    },
};

const nav = document.querySelector(".header__menu");

if (isMobileDevice.any()) {
    nav.classList.add("is-mobile");

    //---------------------------------------------------- Меню на тачскринах -----------------
    const menuRoot = document.querySelector(".menu-root"); // Получить корень меню
    menuRoot.addEventListener("click", (e) => {
        // Обработчик на корень меню

        if (e.target.nodeName !== "SPAN") return; // Если событие не на кнопку, перейти по ссылке
        closeAllMenuLevel(e.target.nextElementSibling);
        e.target.nextElementSibling.classList.toggle("is-active"); // Присваивание класса is-active следующему вложенному списку
        e.target.classList.toggle("rotate"); // Поворот кнопки треугольник
    });
    // Функция закрытия вложенных меню
    function closeAllMenuLevel(current = null) {
        let parents = [];
        if (current) {
            // Если есть текущее меню
            let currentParent = current.parentNode; // Собираем всех родителей текущего меню
            while (currentParent) {
                if (currentParent.classList.contains("menu-root")) break; // Поднимаемся до корня и останавливаем
                if (currentParent.nodeName === "UL")
                    parents.push(currentParent); // Отлавливаем по ul и пушим в массив
                currentParent = currentParent.parentNode; // Текщие родители
            }
        }
        const menuLevel = document.querySelectorAll(".menu-root ul");
        Array.from(menuLevel).forEach((item) => {
            if (item !== current && !parents.includes(item)) {
                // Если это не текущее событие и не родитель текущего события
                item.classList.remove("is-active"); // удалить
                if (item.previousElementSibling.nodeName === "SPAN") {
                    // Если это не текщее событие кнопки
                    item.previousElementSibling.classList.remove("rotate"); // Удаление поворота кнопки
                }
            }
        });
    }
    //---------------------------------------------------- Конец меню-----------
} else {
    nav.classList.add("is-pc");
}

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
