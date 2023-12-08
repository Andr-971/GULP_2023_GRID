// Элементы на странице
const slider = document.querySelector(".slider"); // Трек слайдера
const itemLeft = slider.querySelector(".item-left"); // Левый ползунок слайдера
const itemRight = slider.querySelector(".item-right"); // Правый ползунок слайдера
const numLeft = document.querySelector(".num-left"); // Левый номерной инпут
const buttonLeft = document.querySelector(".btn-left"); // Левая кнопка
const numRight = document.querySelector(".num-right"); // Правый номерной инпут
const buttonRight = document.querySelector(".btn-right"); // Правая кнопка

if (buttonLeft !== null) {
    btnLeft = buttonLeft;
} else {
    btnLeft = false;
}
if (buttonRight !== null) {
    btnRight = buttonRight;
} else {
    btnRight = false;
}
// Настройки слайдера =================================================================================
// Общая длина в единицах
var totalLength = slider.dataset.maxleght;
// Значение единицы
var minValue = itemLeft.dataset.numVal;
var maxValue = itemRight.dataset.numVal;

// Цвета трека
var elementaryColor = "#088db9"; // Начальный цвет
var finiteColor = "rgb(190, 185, 185, 1)"; // Конечный цвет
//======================================================================================================

let minValuePercent = Math.round((minValue / totalLength) * 100);
let maxValuePercent = Math.round((maxValue / totalLength) * 100);

let sumValue = 100;
let currentValueLeft; // Текущее значение левого ползунка в единицах
let currentValueRight; // Текущее значение правого ползунка в единицах
currentValueLeft = minValuePercent; // Дефолтное расположение ползунка
currentValueRight = maxValuePercent; // Дефолтное расположение ползунка
let rightBoundary = slider.offsetWidth - itemLeft.offsetWidth;
let currentSliderLeft = (rightBoundary / sumValue) * currentValueLeft;
let currentSliderRight = (rightBoundary / sumValue) * currentValueRight;

itemLeft.style.left = currentSliderLeft + "px";
itemRight.style.left = currentSliderRight + "px";

// Объект с значениями ползунков
var valueSliderObj = {
    newLeft: currentSliderLeft,
    newRight: currentSliderRight,
};
// Какой браузер
function browserName() {
    var browser_id = navigator.userAgent;
    if (browser_id.search(/Edge/) != -1) return "Edge";
    if (browser_id.search(/Safari/) != -1) return "Safari";
    return "Не определен";
}

// Заскраска трека
function trackColor() {
    var browser = browserName();
    if (browser == "Edge") {
        return (slider.style.background = `${elementaryColor}`);
    } else {
        return (slider.style.background = `linear-gradient(90deg, ${elementaryColor} 0%, ${elementaryColor} ${currentValueLeft}%,
        ${finiteColor} ${currentValueLeft}%, ${finiteColor} ${currentValueRight}%,
        ${elementaryColor} ${currentValueRight}%, ${elementaryColor} 100%)`);
    }
    
}
trackColor(); // Заскраска трека по дефолту

// Координаты слайдера относительно страницы
let sliderRect = slider.getBoundingClientRect();
let sliderRectWithScroll = {};
sliderRectWithScroll.top = sliderRect.top + pageYOffset;
sliderRectWithScroll.left = sliderRect.left + pageXOffset;

btnLeft.onclick = function () {
    let numValue = numLeft.value;
    numLeft.value = numValue;
    // Смещение левого ползунка
    var newLeft = ((numValue / totalLength) * 100 * rightBoundary) / sumValue;
    // Получить результат координат полунка в объект
    valueSliderObj.newLeft = newLeft;
    let valueRightSlider = valueSliderObj.newRight; // Текущее значение правого ползунка
    // Ползунок не может выходить за границы
    if (newLeft < valueRightSlider) {
        itemLeft.style.left = newLeft + "px";
        currentValueLeft = Math.round((newLeft / rightBoundary) * sumValue); // Текущее значение
    }
    trackColor(); // Заскраска трека
};

btnRight.onclick = function () {
    let numValue = numRight.value;
    numRight.value = numValue;
    // Смещение левого ползунка
    var newRight = ((numValue / totalLength) * 100 * rightBoundary) / sumValue;
    // Получить результат координат полунка в объект
    valueSliderObj.newRight = newRight;
    let valueRightSlider = valueSliderObj.newLeft; // Текущее значение левого ползунка
    // Ползунок не может выходить за границы
    if (newRight > valueRightSlider && newRight < slider.offsetWidth) {
        itemRight.style.left = newRight + "px";
        currentValueRight = Math.round((newRight / rightBoundary) * sumValue); // Текущее значение
    }
    trackColor(); // Заскраска трека
};

// Зажатие кнопки мыши на левом ползунке
itemLeft.onmousedown = function (e) {
    // Отмена нативного drag and drop поведения
    this.ondragstart = function () {
        return false;
    };

    // Координаты левого ползунка относительно страницы
    let itemRectLeft = itemLeft.getBoundingClientRect();
    let itemRectWithScroll = {};

    itemRectWithScroll.top = itemRectLeft.top + pageYOffset;
    itemRectWithScroll.left = itemRectLeft.left + pageXOffset;

    // Крайнее правое положение, которого может достичь левый ползунок
    let rightBoundary = slider.offsetWidth - itemLeft.offsetWidth;
    // Крайнее левое положение, которого может достичь левый ползунок
    let leftBoundary =
        rightBoundary - (slider.offsetWidth - itemLeft.offsetWidth);

    // Смещение курсора относительно начала ползунка
    let shiftX = e.pageX - itemRectWithScroll.left;

    // Перетаскивание ползунка при движении мыши
    document.onmousemove = function (e) {
        var newLeft = e.pageX - sliderRectWithScroll.left - shiftX;
        units("left");
        // Получить результат координат полунка в объект
        valueSliderObj.newLeft = newLeft;
        // Значение правого ползунка
        let valueRightSlider = valueSliderObj.newRight;

        // Ползунок не может выходить за границы
        if (newLeft < leftBoundary) {
            newLeft = leftBoundary;
        }
        if (newLeft > rightBoundary - itemRight.offsetWidth) {
            newLeft = rightBoundary - itemRight.offsetWidth;
        }
        if (newLeft > valueRightSlider - itemLeft.offsetWidth) {
            newLeft = valueRightSlider - itemLeft.offsetWidth;
        }
        if (typeof valueRightSlider === "undefined") {
            if (newLeft > currentSliderRight - itemLeft.offsetWidth)
                newLeft = currentSliderRight - itemLeft.offsetWidth;
        }

        itemLeft.style.left = newLeft + "px"; // Движение ползунка

        // Обновление результата на треке
        if (!valueRightSlider) {
            currentValueLeft = Math.round((newLeft / rightBoundary) * sumValue); // Текущее значение
            mirrorValue = sumValue - currentValueLeft;
            // Раскраска трека по default
            trackColor();
        } else {
            currentValueLeft = Math.round((newLeft / rightBoundary) * sumValue); // Текущее значение
            let rightSlider = Math.round(
                (valueRightSlider / rightBoundary) * sumValue
            );
            // Раскраска трека
            trackColor();
        }
    };

    // Сброс при отпускании кнопки мышки
    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    };

    return false;
};

// Зажатие кнопки мыши на правом ползунке
itemRight.onmousedown = function (e) {
    // Отмена нативного drag and drop поведения
    this.ondragstart = function () {
        return false;
    };

    // Координаты ползунка относительно страницы
    let itemRectRight = itemRight.getBoundingClientRect();
    let itemRectWithScroll = {};

    itemRectWithScroll.top = itemRectRight.top + pageYOffset;
    itemRectWithScroll.left = itemRectRight.left + pageXOffset;

    // Крайнее правое положение, которого может достичь ползунок
    let rightBoundary = slider.offsetWidth - itemRight.offsetWidth;

    // Крайнее левое положение, которого может достичь ползунок
    let leftBoundary = itemLeft.offsetWidth;

    // Смещение курсора относительно начала ползунка
    let shiftX = e.pageX - itemRectWithScroll.left;

    // Перетаскивание ползунка при движении мыши
    document.onmousemove = function (e) {
        let newRight = e.pageX - sliderRectWithScroll.left - shiftX;
        units("right");
        // Получить результат координат полунка в объект
        valueSliderObj.newRight = newRight;
        // Значение левого ползунка
        let valueLeftSlider = valueSliderObj.newLeft;

        // Ползунок не может выходить за границы
        if (newRight > rightBoundary) newRight = rightBoundary;
        if (newRight < leftBoundary) newRight = leftBoundary;
        if (newRight < valueLeftSlider + itemLeft.offsetWidth)
            newRight = valueLeftSlider + itemLeft.offsetWidth;
        if (typeof valueLeftSlider === "undefined") {
            if (currentSliderLeft + itemLeft.offsetWidth > newRight) {
                newRight = currentSliderLeft + itemLeft.offsetWidth;
            }
        }
        itemRight.style.left = newRight + "px";

        // Обновление результата на треке
        if (!valueLeftSlider) {
            currentValueRight = Math.round(
                (newRight / rightBoundary) * sumValue
            ); // Текущее значение
            // Раскраска трека по default
            trackColor();
        } else {
            currentValueRight = Math.round(
                (newRight / rightBoundary) * sumValue
            ); // Текущее значение
            let leftSlider = Math.round(
                (valueLeftSlider / rightBoundary) * sumValue
            );
            // Раскраска трека
            trackColor();
        }
    };

    // Сброс при отпускании кнопки мышки
    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    };

    return false;
};

// Нажатие тачскрина левого ползунка
itemLeft.ontouchstart = function (e) {
    // Подавить событие
    e.preventDefault();

    // Координаты ползунка относительно страницы
    let itemRect = itemLeft.getBoundingClientRect();
    let itemRectWithScroll = {};

    itemRectWithScroll.top = itemRect.top + pageYOffset;
    itemRectWithScroll.left = itemRect.left + pageXOffset;

    // Крайнее правое положение, которого может достичь левый ползунок
    let rightBoundary = slider.offsetWidth - itemLeft.offsetWidth;
    // Крайнее левое положение, которого может достичь левый ползунок
    let leftBoundary =
        rightBoundary - (slider.offsetWidth - itemLeft.offsetWidth);

    // Смещение курсора относительно начала ползунка
    let shiftX = e.touches[0].pageX - itemRectWithScroll.left;
    // ---------------------------------------------------------------
    // Перетаскивание ползунка при движении тачскрина
    itemLeft.ontouchmove = function (e) {
        let newLeft = e.touches[0].pageX - sliderRectWithScroll.left - shiftX;
        units("left");
        // Получить результат координат полунка в объект
        valueSliderObj.newLeft = newLeft;
        // Значение правого ползунка
        let valueRightSlider = valueSliderObj.newRight;

        // Ползунок не может выходить за границы
        if (newLeft < leftBoundary) {
            newLeft = leftBoundary;
        }
        if (newLeft > rightBoundary - itemRight.offsetWidth) {
            newLeft = rightBoundary - itemRight.offsetWidth;
        }
        if (newLeft > valueRightSlider - itemLeft.offsetWidth) {
            newLeft = valueRightSlider - itemLeft.offsetWidth;
        }
        if (typeof valueRightSlider === "undefined") {
            if (newLeft > currentSliderRight - itemLeft.offsetWidth)
                newLeft = currentSliderRight - itemLeft.offsetWidth;
        }
        itemLeft.style.left = newLeft + "px"; // Движение ползунка

        // Обновление результата на треке
        if (!valueRightSlider) {
            currentValueLeft = Math.round((newLeft / rightBoundary) * sumValue); // Текущее значение
            mirrorValue = sumValue - currentValueLeft;
            // Раскраска трека по default
            trackColor();
        } else {
            currentValueLeft = Math.round((newLeft / rightBoundary) * sumValue); // Текущее значение
            let rightSlider = Math.round(
                (valueRightSlider / rightBoundary) * sumValue
            );
            // Раскраска трека
            trackColor();
        }
    };
};

// Нажатие тачскрина правого ползунка
itemRight.ontouchstart = function (e) {
    // Подавить событие
    e.preventDefault();

    // Координаты ползунка относительно страницы
    let itemRect = itemRight.getBoundingClientRect();
    let itemRectWithScroll = {};

    itemRectWithScroll.top = itemRect.top + pageYOffset;
    itemRectWithScroll.left = itemRect.left + pageXOffset;

    // Крайнее правое положение, которого может достичь ползунок
    let rightBoundary = slider.offsetWidth - itemRight.offsetWidth;

    // Крайнее левое положение, которого может достичь ползунок
    let leftBoundary = itemLeft.offsetWidth;

    // Смещение курсора относительно начала ползунка
    let shiftX = e.touches[0].pageX - itemRectWithScroll.left;
    // ---------------------------------------------------------------
    // Перетаскивание правого ползунка при движении тачскрина
    itemRight.ontouchmove = function (e) {
        let newRight = e.touches[0].pageX - sliderRectWithScroll.left - shiftX;
        units("right");
        // Получить результат координат полунка в объект
        valueSliderObj.newRight = newRight;
        // Значение левого ползунка
        valueLeftSlider = valueSliderObj.newLeft;

        // Ползунок не может выходить за границы
        if (newRight > rightBoundary) newRight = rightBoundary;
        if (newRight < leftBoundary) newRight = leftBoundary;
        if (newRight < valueLeftSlider + itemLeft.offsetWidth)
            newRight = valueLeftSlider + itemLeft.offsetWidth;
        if (typeof valueLeftSlider === "undefined") {
            if (currentSliderLeft + itemLeft.offsetWidth > newRight) {
                newRight = currentSliderLeft + itemLeft.offsetWidth;
            }
        }
        itemRight.style.left = newRight + "px";

        // Обновление результата на треке
        if (!valueLeftSlider) {
            currentValueRight = Math.round(
                (newRight / rightBoundary) * sumValue
            ); // Текущее значение
            // Раскраска трека по default
            trackColor();
        } else {
            currentValueRight = Math.round(
                (newRight / rightBoundary) * sumValue
            ); // Текущее значение
            let leftSlider = Math.round(
                (valueLeftSlider / rightBoundary) * sumValue
            );
            // Раскраска трека
            trackColor();
        }
    };
};

// Передача в дата-атрибут единицы измерения
function units(side) {
    if (side === "left") {
        let minValueNum = (totalLength / 100) * currentValueLeft;
        itemLeft.dataset.numVal = minValueNum;
        if (numLeft !== null) {
            numLeft.value = minValueNum;
        }
    }
    if (side === "right") {
        let maxValueNum = (totalLength / 100) * currentValueRight;
        itemRight.dataset.numVal = maxValueNum;
        if (numLeft !== null) {
            numRight.value = maxValueNum;
        }
    }
}

