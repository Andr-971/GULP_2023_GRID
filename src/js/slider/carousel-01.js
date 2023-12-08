// ====================================== Настройки карусели ===============
// Элементы на странице
const slider = document.querySelector("#carousell-1"); // Общая обёртка карусели
const sliderItems = Array.from(slider.children);
const numberSlider = document.querySelector(".number-sliders"); // Общая обёртка нумерации
const bullets = document.querySelector(".bullets"); // Общая обёртка буллетов
const bulletItems = Array.from(bullets.children);
const sliderBullet = document.querySelector(".bullets, #carousell-1");
const btnNext = document.querySelector("#btnNext"); // Кнопка вперёд
const btnPrev = document.querySelector("#btnPrev"); // Кнопка назад

// автоматическое перелистывание и время задержки
const auto = false; // false / true
const time = 3000; // Милисекунд
// Классы для нумерации
let oneText = "text-number"; // Первый span >Слайд:<
let word = "Слайд:"; // Текст первого span
let currentText = "current-slide"; // Текущий номер слайда >1<
let separator = "separator"; // Класс разделителя
let separatorText = "из"; // Текст разделителя
let sumNumber = "sum-number"; // Класс суммы слайдов

// ============================================================================
if (auto) {
    setInterval(function () {
        showNextSlide("next");
    }, time);
}

sliderItems.forEach(function (slide, index) {
    // Добавляем индексы
    slide.dataset.id = index;
    // Добавляем data атрибут active для первого слайда активного слайда
    sliderItems[0].setAttribute("data-active", "true");
    // Скрываем все слайды, кроме первого
    if (index !== 0)
        slide.classList.add("hidden");

    // Клик по слайду
    slide.addEventListener("click", function (e) {
        showNextSlide("next");
    });
});
// Кнопка вперёд
btnNext.onclick = function () {
    showNextSlide("next");
};
// Кнопка назад
btnPrev.onclick = function () {
    showNextSlide("prev");
};
// Перелистывание
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchmove", handleTouchMove);
let x1 = null;
let y1 = null;

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
    if (!x1 || !y1) return false;
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff < 0) {
            // Влево
            showNextSlide("next");
        } else if (yDiff > 0) {
            // Вправо
            showNextSlide("prev");
        }
    } else {
        if (yDiff > 0) {
            // Вниз
            // console.log("Вниз");
        } else if (yDiff < 0) {
            // Вверх
            // console.log("Вверх");
        }
    }
    x1 = null;
    y1 = null;
}

let currentSlide;
let currentSlideIndex;

// Функция показа слайдов
function showNextSlide(direсtion) {
    /*
     * Скрываем текущий слайд
     */
    // Получаем активный слайд
    currentSlide = slider.querySelector("[data-active]");
    // Получаем id атрибут активного слайда
    currentSlideIndex = +currentSlide.dataset.id;
    // Добавляем disply:none к текущему слайду и удаляем атрибут data-active
    currentSlide.classList.add("hidden");
    currentSlide.removeAttribute("data-active");

    // Получаем текущий активный буллет и удаляем класс b-active
    if (bullets.querySelector(".b-active")) {
        const currentBullet = bullets.querySelector(".b-active");
        currentBullet.classList.remove("b-active");
    }

    /*
     * Расcчитываем и показываем следующий слайд в зависимости от направления
     */
    let nextSlideIndex;
    if (direсtion === "next") {
        nextSlideIndex =
            currentSlideIndex + 1 === sliderItems.length
                ? 0
                : currentSlideIndex + 1;
    } else if (direсtion === "prev") {
        nextSlideIndex =
            currentSlideIndex === 0
                ? sliderItems.length - 1
                : currentSlideIndex - 1;
    }
    /*
     * Показываем следующий слайд
     */
    const nextSlaide = slider.querySelector(`[data-id="${nextSlideIndex}"]`);
    nextSlaide.classList.remove("hidden");
    nextSlaide.setAttribute("data-active", "");

    numberShowSlider(nextSlaide);

    // Добавление класса b-active к буллету
    // Получаем буллет по data-bullet
    if (bullets.querySelector(`[data-bullet="${nextSlideIndex}"]`)) {
        const buletId = bullets.querySelector(
            `[data-bullet="${nextSlideIndex}"]`
        );
        buletId.classList.add("b-active");
    }
    
}

// Колличество слайдов
const sumSlide = sliderItems.length;


let currentId;
// Функция показа буллетов
function showBulletSlide() {
    
    for (let i = 0; i < sumSlide; i++) {
        bullets.insertAdjacentHTML(
            "beforeend",
            `<li class="bullet" data-bullet="${i}">${i + 1}</li>` // ${i + 1} если нужны цифры
        );
    }

    bullets.childNodes[0].classList.add("b-active");

    bullets.addEventListener("click", function (e) {
        // Получаем активный слайд
        const currentSlide = slider.querySelector("[data-active]");

        // Добавляем disply:none к текущему слайду и удаляем атрибут data-active
        currentSlide.classList.add("hidden");
        currentSlide.removeAttribute("data-active");

        // Получаем текущий активный буллет
        const currentBullet = bullets.querySelector(".b-active");
        currentBullet.classList.remove("b-active");

        if (e.target.closest(".bullet")) {
            currentId = e.target.dataset.bullet; // data-id
            const nextSlaide = slider.querySelector(`[data-id="${currentId}"]`);
            nextSlaide.classList.remove("hidden");
            nextSlaide.setAttribute("data-active", "");
            e.target.classList.add("b-active");
            
            numberShowSlider(nextSlaide);
        }
    });
}
showBulletSlide();
// console.log(currentId);

let numberCurrentSlide = 1;
// Создание блока цифр
function numberShow() {
    if (numberSlider) {
    numberSlider.insertAdjacentHTML(
        "beforeend",
        `<span class="${oneText}">${word}</span><div class="${currentText}">1</div><span class="${separator}">${separatorText}</span><span class="${sumNumber}">${sumSlide}</span>`
    ); 
    }
}
numberShow(); 
// Текущий слайд
function numberShowSlider(number) {
    let numberCurrentSlide;
    if (numberSlider) {
        currentNumber = numberSlider.childNodes[1];
        numberCurrentSlide = +number.dataset.id + 1;
        currentNumber.textContent = numberCurrentSlide;
    }
}



