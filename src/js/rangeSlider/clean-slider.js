// Элементы на странице
const slider = document.querySelector(".slider"); // Трек слайдера
const item = slider.querySelector(".item"); // Ползунок слайдера
const show = document.querySelector(".show");
const num = document.querySelector(".appoint>input[type=number]"); //
const btnNum = document.querySelector(".appoint>button");

// Настройки слайдера =================================================================================
// Общая длина в единицах
let sumValue = 100;
// Значение единицы
let unitValue = "%";

let currentValue;
// currentValue = 20; // Дефолтное расположение ползунка
currentValue = num.value;

let mirrorValue; // Зеркальное расположение трека от ползунка
// mirrorValue = 80;
mirrorValue = sumValue - currentValue;
// Цвета трека
let elementaryColor = "#088db9"; // Начальный цвет
let finiteColor = "#beb9b9"; // Конечный цвет


// let result = item; // Записать в ползунок
let str = show; // Записать в строку
item.dataset.number = currentValue + unitValue; // Дефолтное значение над бегунком
str.innerHTML = currentValue + unitValue;

//======================================================================================================
btnNum.onclick = function (e) {
    currentValue = num.value;
    item.style.left = currentValue + '%';
    item.dataset.number = currentValue + unitValue;
    str.innerHTML = currentValue + unitValue;
    // Раскраска трека
    slider.style.background = `linear-gradient(90deg, ${elementaryColor} 0%, ${elementaryColor} ${currentValue}%, ${finiteColor} 0%, ${finiteColor} ${mirrorValue}%)`;
};

slider.style.background = `linear-gradient(90deg, ${elementaryColor} 0%, ${elementaryColor} ${currentValue}%, ${finiteColor} 0%, ${finiteColor} ${mirrorValue}%)`;
item.style.left = currentValue + unitValue; // Дефолтное расположение ползунка

// Координаты слайдера относительно страницы
let sliderRect = slider.getBoundingClientRect();
let sliderRectWithScroll = {};
sliderRectWithScroll.top = sliderRect.top + pageYOffset;
sliderRectWithScroll.left = sliderRect.left + pageXOffset;

// Зажатие кнопки мыши на ползунке
item.onmousedown = function (e) {
    // Отмена нативного drag and drop поведения
    this.ondragstart = function () {
        return false;
    };

    // Координаты ползунка относительно страницы
    let itemRect = item.getBoundingClientRect();
    let itemRectWithScroll = {};

    itemRectWithScroll.top = itemRect.top + pageYOffset;
    itemRectWithScroll.left = itemRect.left + pageXOffset;

    // Крайнее правое положение, которого может достичь ползунок
    let rightBoundary = slider.offsetWidth - item.offsetWidth;

    // Смещение курсора относительно начала ползунка
    let shiftX = e.pageX - itemRectWithScroll.left;

    // Перетаскивание ползунка при движении мыши
    document.onmousemove = function (e) {
        let newLeft = e.pageX - sliderRectWithScroll.left - shiftX;

        // Ползунок не может выходить за границы
        if (newLeft < 0) newLeft = 0;
        if (newLeft > rightBoundary) newLeft = rightBoundary;
        item.style.left = newLeft + "px";

        // Обновление результата
        currentValue = Math.round((newLeft / rightBoundary) * sumValue); // Текущее значение
        // Противополжное значение
        mirrorValue = sumValue - currentValue;
        if (typeof result !== "undefined") result.innerHTML = currentValue + unitValue;
        if (typeof str !== "undefined") str.innerHTML = currentValue + unitValue;
        valueOver();
        // Раскраска трека
        slider.style.background = `linear-gradient(90deg, ${elementaryColor} 0%, ${elementaryColor} ${currentValue}%, ${finiteColor} 0%, ${finiteColor} ${mirrorValue}%)`;
    };

    // Сброс при отпускании кнопки мышки
    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    };

    return false;
};

// Нажатие на кнопку тачскрина
item.ontouchstart = function (e) {
    // Подавить событие
    e.preventDefault();
    // Координаты ползунка относительно страницы
    let itemRect = item.getBoundingClientRect();
    let itemRectWithScroll = {};

    itemRectWithScroll.top = itemRect.top + pageYOffset;
    itemRectWithScroll.left = itemRect.left + pageXOffset;
    
    // Крайнее правое положение, которого может достичь ползунок
    let rightBoundary = slider.offsetWidth - item.offsetWidth;
    
    // Смещение курсора относительно начала ползунка
    let shiftX = e.touches[0].pageX - itemRectWithScroll.left;

    item.ontouchmove = function (e) {
        let newLeft = e.touches[0].pageX - sliderRectWithScroll.left - shiftX;
        // Ползунок не может выходить за границы
        if (newLeft < 0) newLeft = 0;
        if (newLeft > rightBoundary) newLeft = rightBoundary;
        item.style.left = newLeft + "px";
        // Обновление результата
        currentValue = Math.round((newLeft / rightBoundary) * sumValue); // Текущее значение
        // Противополжное значение
        mirrorValue = sumValue - currentValue;
        if(typeof result !== "undefined") result.innerHTML = currentValue + unitValue;
        if (typeof str !== "undefined") str.innerHTML = currentValue + unitValue;
        valueOver();
        // Раскраска трека
        slider.style.background = `linear-gradient(90deg, ${elementaryColor} 0%, ${elementaryColor} ${currentValue}%, ${finiteColor} 0%, ${finiteColor} ${mirrorValue}%)`;

    };
};

// Передача в дата-атрибут значение
function valueOver() {
    item.dataset.number = currentValue + unitValue;
}



