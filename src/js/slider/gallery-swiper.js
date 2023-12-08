// Классы на странице
const GalleryClassName = "gallery", // Класс на обёртке галереи
    GalleryLineClassName = "gallery-line", // Класс на обёртке слайдов
    GallerySlideClassName = "gallery-unit"; // Класс обёртка на слайде

class Gallery {
    constructor(element, options = {}) {
        this.containerNode = element; // Обёртка галереи
        this.sizeSlide = element.childElementCount; // Количество слайдов
        this.slideIndex = 0; // Начальный шндекс слайда
        (this.trfRegExp = /([-0-9.]+(?=px))/), // Выбрать только цифры без пикселей
            (this.infiniteSlide = options.infiniteSlide); // Бесконечный слайдер
        this.autoFlipping = true;
        if (typeof options.autoscrolling !== "undefined") {
            this.autoscrolling = true;
            if (typeof options.autoscrolling.left !== "undefined") {
                this.autoscrollingLeft = options.autoscrolling.left;
            } else if (typeof options.autoscrolling.right !== "undefined") {
                this.autoscrollingRight = options.autoscrolling.right;
            }
            if (typeof options.autoscrolling.delay !== "undefined") {
                this.autoscrollingDelay = +options.autoscrolling.delay;
            }
        }
        if (typeof options.controls !== "undefined") {
            this.btnLeft = document.querySelector(`${options.controls.prev}`);
            this.btnRight = document.querySelector(`${options.controls.next}`);
        }
        if (typeof options.bullets !== "undefined") {
            if (typeof options.bullets.bulletsClassName !== "undefined") {
                this.bullets = document.querySelector(
                    `${options.bullets.bulletsClassName}`
                );
            }
            if (typeof options.bullets.namberBullet !== "undefined") {
                this.namberBullet = options.bullets.namberBullet;
            }
            this.bulletItems = true;
        }
        if (typeof options.numberSlide !== "undefined") {
            this.numberSlide = options.numberSlide;
        }

        // Законтекстить this в методы
        this.manageHTML = this.manageHTML.bind(this);
        this.setParameters = this.setParameters.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.resizeGallery = this.resizeGallery.bind(this);
        this.clickSlide = this.clickSlide.bind(this);
        this.draggingSlide = this.draggingSlide.bind(this);
        this.lettingSlide = this.lettingSlide.bind(this);
        this.switchingSlides = this.switchingSlides.bind(this);
        this.slideMovement = this.slideMovement.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.btnPrev = this.btnPrev.bind(this);
        this.btnNext = this.btnNext.bind(this);
        this.autoFlippingSlide = this.autoFlippingSlide.bind(this);
        this.handlerBullets = this.handlerBullets.bind(this);
        this.activeBullet = this.activeBullet.bind(this);
        this.activeNumberSlide = this.activeNumberSlide.bind(this);

        // Запуск методов в конструкторе
        this.manageHTML();
        this.setParameters();
        this.setEvents();

        if (this.autoscrolling) {
            this.autoFlippingSlide();
        }
    }
    // Создание HTML кода
    manageHTML() {
        this.containerNode.classList.add(GalleryClassName);
        this.containerNode.innerHTML = `
            <div class="${GalleryLineClassName}">
                ${this.containerNode.innerHTML}
            </div>
        `;
        this.lineNode = this.containerNode.querySelector(
            `.${GalleryLineClassName}`
        );

        this.slideNodes = Array.from(this.lineNode.children).map((childNode) =>
            wrapElementByDiv({
                element: childNode,
                className: GallerySlideClassName,
            })
        );
        for (let i = 0; i < this.sizeSlide; i++) {
            if (typeof options.bullets.bulletsClassName !== "undefined") {
                this.bullets.innerHTML += `
                <li class="bullet">
                </li>
                `;
            }
        }
        if (this.numberSlide) {
            let numberSlide = document.createElement('div');
            numberSlide.className = "numbers-slide";
            numberSlide.innerHTML = `
            <span class="one-text">Слайд: </span>
            <span class="number-slide">${this.slideIndex + 1}</span>
            <span class="separator"> из </span>
            <span class="length-slide">${this.sizeSlide}</span>
            `;
            this.containerNode.prepend(numberSlide);
        }
    }
    // Присвоение параметров
    setParameters() {
        this.widthSlide = this.lineNode.getBoundingClientRect().width; // Ширина слайдера

        let widthСontainerNode = this.containerNode.getBoundingClientRect();
        this.widthContiner = widthСontainerNode.width; // Ширина контейнера слайдера(Обёртка галереи)
        this.lineNode.style.cssText = `position: relative`;
        this.lineNode.style.transform = `translate3d(-${
            this.slideIndex * this.widthSlide
        }px, 0px, 0px)`;
        // Ширина экрана
        this.windowScreenWidth = window.screen.width;

        if (this.slideIndex === 0) {
            this.btnLeft.hidden = true;
        }

        if (typeof options.indent !== "undefined") {
            this.breckPoint = Object.keys(options.indent);
            this.breckPointValues = Object.values(options.indent);
            if (this.windowScreenWidth > this.breckPoint[3]) {
                this.indentWidht = this.breckPointValues[3];
            }
            if (this.windowScreenWidth <= this.breckPoint[3]) {
                this.indentWidht = this.breckPointValues[3];
            }
            if (this.windowScreenWidth <= this.breckPoint[2]) {
                this.indentWidht = this.breckPointValues[2];
            }
            if (this.windowScreenWidth <= this.breckPoint[1]) {
                this.indentWidht = this.breckPointValues[1];
            }
            if (this.windowScreenWidth <= this.breckPoint[0]) {
                this.indentWidht = this.breckPointValues[0];
            }
        }
        if (typeof this.indentWidht !== "undefined") {
            this.lineNode.style.width = `${
                this.sizeSlide * (this.widthContiner + this.indentWidht)
            }px`; // ширина обёртки слайдеров в пикселях
        } else {
            this.lineNode.style.width = `${
                this.sizeSlide * this.widthContiner
            }px`; // ширина обёртки слайдеров в пикселях
        }
        this.numberLastIndexSlide = --this.sizeSlide; // индекс последнего слайда

        // Присвоить ширину, id каждому слайду и первому слайду data-acive
        Array.from(this.slideNodes).forEach((slideNode, index) => {
            slideNode.style.width = `${this.widthContiner}px`;
            slideNode.dataset.id = index + 1;
            if (index === 0) {
                slideNode.setAttribute("data-active", "active");
            }
            if (this.indentWidht !== "undefined") {
                slideNode.style.marginRight = this.indentWidht + "px";
            }
        });
        if (options.widthWindowsSlider) {
            let widthProcent = options.widthWindowsSlider * 100;
            this.realWidth = (widthСontainerNode.width / 100) * widthProcent;
            this.containerNode.style.width = this.realWidth + "px";
        }
        if (this.indentWidht) {
            this.lineNode.lastChild.previousElementSibling.style.marginRight =
                "0px";
        }

        // Буллеты
        if (this.namberBullet) {
            this.bullets = Array.from(this.bullets.children).forEach(function (
                item,
                index,
                array
            ) {
                item.innerText = index + 1;
            });
        }
        Array.from(this.bullets.children).forEach(function (
            item,
            index,
            array
        ) {
            item.dataset.id = index + 1;
        });
        this.bullets.children[this.slideIndex].dataset.active = "active";
        // Показ номера текущего слайда из колличества
        if (this.numberSlide) {
            this.numberCurrSlide = document.querySelector(".number-slide");
        }
        
    }
    // Обработчики событий
    setEvents() {
        window.addEventListener("resize", this.resizeGallery); // Наблюдатель за шириной слайдера
        this.lineNode.addEventListener("mousedown", this.clickSlide); // Нажатие левой кнопки мыши на слайдер mousedown
        this.lineNode.addEventListener("mouseup", this.lettingSlide); // Отпускание левой кнопки мыши на слайдере mouseup
        this.btnLeft.addEventListener("click", this.btnPrev);
        this.btnRight.addEventListener("click", this.btnNext);
        this.bullets.addEventListener("click", this.handlerBullets);

        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
                navigator.userAgent
            ) ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
                navigator.platform
            )
        ) {
            this.touchScreen = true;
            this.lineNode.addEventListener("touchstart", this.clickSlide); // Нажатие на тачскрин
            this.lineNode.addEventListener("touchend", this.lettingSlide); // Отпускание тачскрин
        }

        // Отменить браузерный drag and drop поведения
        this.containerNode.ondragstart = function () {
            return false;
        };
    }
    // Удаление обработчика событий за наблюдением и перерасчётом ширины
    destroyEvents() {
        window.removeEventListener("resize", this.resizeGallery);
    }
    // Перерасчёт ширины
    resizeGallery() {
        this.setParameters();
        location.reload();
    }
    // Обработчик нажатия левой кнопки мыши на слайд
    clickSlide(e) {
        this.autoscrolling = false;
        this.posThreshold = (this.widthSlide / 100) * options.percentShift; // Минимальный сдвиг по экрану
        // убираем плавный переход, чтобы track двигался за курсором без задержки
        // т.к. он будет включается в функции slideMovement(delay)
        this.lineNode.style.transition = "";
        if (this.touchScreen) {
            this.posX1 = e.touches[0].pageX;
            this.posInit = this.posX1;
        } else {
            this.posX1 = e.pageX;
            this.posInit = this.posX1;
        }
        // Обработчие перетаскивания мыши, тачскрин
        this.lineNode.addEventListener("mousemove", this.draggingSlide); // mousemove
        this.lineNode.addEventListener("touchmove", this.draggingSlide); // touchmove
    }
    // Обработчик отпускание левой кнопки мыши на слайдере
    lettingSlide(e) {
        this.posFinal = this.posInit - this.posX1;
        // убираем знак минус и сравниваем с порогом сдвига слайда
        if (Math.abs(this.posFinal) > this.posThreshold) {
            let slideActive;
            // если мы тянули вправо, то уменьшаем номер текущего слайда
            if (this.posInit < this.posX1) {
                slideActive = Array.from(this.lineNode.children)[
                    this.slideIndex
                ].removeAttribute("data-active");
                if (!this.infiniteSlide) {
                    if (this.slideIndex > 0) {
                        this.slideIndex--;
                        if (this.slideIndex === 0) {
                            this.btnLeft.hidden = true;
                        }
                        if (this.slideIndex === this.numberLastIndexSlide - 1) {
                            this.btnRight.hidden = false;
                        }
                        this.activeBullet(this.slideIndex);
                        this.activeNumberSlide(this.slideIndex);
                    }
                } else if (this.infiniteSlide) {
                    if (this.slideIndex <= 0) {
                        this.slideIndex = this.numberLastIndexSlide + 1;
                        this.slideMovement("noDelay", this.slideIndex);
                    }
                    this.slideIndex--;
                    this.activeBullet(this.slideIndex);
                    this.activeNumberSlide(this.slideIndex);
                }
                slideActive = Array.from(this.lineNode.children)[
                    this.slideIndex
                ].dataset.active = "active";
                // если мы тянули влево, то увеличиваем номер текущего слайда
            } else if (this.posInit > this.posX1) {
                slideActive = Array.from(this.lineNode.children)[
                    this.slideIndex
                ].removeAttribute("data-active");
                if (!this.infiniteSlide) {
                    if (this.slideIndex < this.numberLastIndexSlide) {
                        if (this.slideIndex === this.numberLastIndexSlide - 1) {
                            this.btnRight.hidden = true;
                        }
                        this.slideIndex++;
                        this.btnLeft.hidden = false;
                    }
                    this.activeBullet(this.slideIndex);
                    this.activeNumberSlide(this.slideIndex);
                } else if (this.infiniteSlide) {
                    if (this.slideIndex >= this.numberLastIndexSlide) {
                        this.slideIndex = 0;
                        this.slideMovement("noDelay", this.slideIndex);
                        this.slideIndex = -1;
                    }
                    this.btnLeft.hidden = false;
                    this.slideIndex++;
                    this.activeBullet(this.slideIndex);
                    this.activeNumberSlide(this.slideIndex);
                }
                slideActive = Array.from(this.lineNode.children)[
                    this.slideIndex
                ].dataset.active = "active";
            }
            // если курсор двигался, то запускаем функцию переключения слайдов
            if (this.posInit !== this.posX1) {
                this.slideMovement("delay", this.slideIndex);
            }
        }
        this.lineNode.removeEventListener("mousemove", this.draggingSlide);
        this.lineNode.removeEventListener("touchmove", this.draggingSlide);
    }
    // Обработчик перетаскивания мыши
    draggingSlide(e) {
        if (this.touchScreen) {
            this.posX2 = this.posX1 - e.touches[0].pageX;
            this.posX1 = e.touches[0].pageX;
        } else {
            this.posX2 = this.posX1 - e.pageX;
            this.posX1 = e.pageX;
        }
        // для более красивой записи возьмем в переменную текущее свойство transform
        this.style = this.lineNode.style.transform;
        // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
        this.transform = Math.round(+this.style.match(this.trfRegExp)[0]);
        this.lineNode.style.transform = `translate3d(${
            this.transform - this.posX2
        }px, 0px, 0px)`;
    }

    // Метод передвижения слайдера
    slideMovement(delay, index) {
        if (delay === "delay") {
            this.lineNode.style.transition = `transform ${options.secondDelay} ease 0s`;
        }
        if (delay === "noDelay") {
            this.lineNode.style.transition = `transform 0s ease 0s`;
        }

        return (this.lineNode.style.transform = `translate3d(-${
            index * (this.widthSlide + this.indentWidht)
        }px, 0px, 0px)`);
    }

    // Метод показа слайда по id
    switchingSlides(index) {
        this.slideIndex = index;
        this.slideMovement("delay", this.slideIndex);
    }

    // Метод перехода к следующему слайду
    next() {
        // this.autoscrolling = false;
        if (!this.infiniteSlide) {
            if (this.slideIndex < this.numberLastIndexSlide) {
                let slideActive = Array.from(this.lineNode.children)[
                    this.slideIndex
                ];
                slideActive.removeAttribute("data-active");
                this.switchingSlides(++this.slideIndex);
                slideActive.dataset.active = "active";
                if (this.slideIndex === this.numberLastIndexSlide) {
                    this.btnRight.hidden = true;
                }
                if (this.slideIndex !== 0) {
                    this.btnLeft.hidden = false;
                }
                this.activeBullet(this.slideIndex);
                this.activeNumberSlide(this.slideIndex);
            }
        } else if (this.infiniteSlide) {
            let slideActive = Array.from(this.lineNode.children)[
                this.slideIndex
            ];

            slideActive.removeAttribute("data-active");
            if (this.slideIndex >= this.numberLastIndexSlide) {
                this.slideIndex = 0;
                this.slideMovement("noDelay", this.slideIndex);
                this.slideIndex = -1;
            }
            this.switchingSlides(++this.slideIndex);
            if (this.slideIndex !== 0) {
                this.btnLeft.hidden = false;
            }
            slideActive.dataset.active = "active";
            this.activeBullet(this.slideIndex);
            this.activeNumberSlide(this.slideIndex);
        }
    }
    // Метод перехода к предыдущему слайду
    prev() {
        this.autoscrolling = false;
        if (!this.infiniteSlide) {
            if (this.slideIndex > 0) {
                let slideActive = Array.from(this.lineNode.children)[
                    this.slideIndex
                ];
                slideActive.removeAttribute("data-active");
                this.switchingSlides(--this.slideIndex);
                slideActive.dataset.active = "active";
            }
            if (this.slideIndex !== this.numberLastIndexSlide) {
                this.btnRight.hidden = false;
            }
            if (this.slideIndex === 0) {
                this.btnLeft.hidden = true;
            }
            this.activeBullet(this.slideIndex);
            this.activeNumberSlide(this.slideIndex);
        } else if (this.infiniteSlide) {
            let slideActive = Array.from(this.lineNode.children)[
                this.slideIndex
            ];

            slideActive.removeAttribute("data-active");
            if (this.slideIndex <= 0) {
                this.slideIndex = this.numberLastIndexSlide + 1;
                this.slideMovement("noDelay", this.slideIndex);
            }
            this.switchingSlides(--this.slideIndex);
            slideActive.dataset.active = "active";
            this.activeBullet(this.slideIndex);
            this.activeNumberSlide(this.slideIndex);
        }
    }
    btnPrev() {
        this.prev();
    }
    btnNext() {
        this.next();
    }
    // Метод автоперелистывания
    autoFlippingSlide() {
        if (this.autoFlipping) {
            let delay = 1000 * this.autoscrollingDelay;
            if (this.autoscrollingLeft) {
                setInterval(() => this.prev(), delay);
            } else if (this.autoscrollingRight) {
                setInterval(() => this.next(), delay);
            }
        }
    }
    // Метод обработки буллетов
    handlerBullets(e) {
        Array.from(this.bullets.children).forEach(function (
            item,
            index,
            array
        ) {
            item.removeAttribute("data-active");
        });
        e.target.dataset.active = "active";
        this.slideIndex = e.target.getAttribute("data-id") - 1;
        this.slideMovement("delay", this.slideIndex);
        this.activeNumberSlide(this.slideIndex);
    };
    activeBullet(index) {
        if (this.bulletItems) {
            Array.from(this.bullets.children).forEach(function (
                item,
                index,
                array
            ) {
                item.removeAttribute("data-active");
            });
            this.bullets.children[index].dataset.active = "active";
        }
    }
    // Метод изменения номера слайда
    activeNumberSlide(index) {
        if (typeof this.numberCurrSlide !== "undefined") {
            this.numberCurrSlide.innerText = index + 1;
        }
    }
}
// Функция создания в элементе div с классом
function wrapElementByDiv({ element: e, className: t }) {
    const s = document.createElement("div");
    return (
        s.classList.add(t), e.parentNode.insertBefore(s, e), s.appendChild(e), s
    );
}

new Gallery(
    document.getElementById("gallery"),
    (options = {
        widthWindowsSlider: 1,
        indent: {
            1400: 1,
            960: 1,
            780: 1,
            560: 1,
        },
        secondDelay: "0.4s",
        percentShift: 20,
        infiniteSlide: true,
        autoscrolling: {
            // left: true,
            // right: true,
            delay: "2",
        },
        controls: {
            prev: "#btnPrev",
            next: "#btnNext",
        },
        bullets: {
            bulletsClassName: ".bullets",
            // namberBullet: true
        },
        numberSlide: false,
        // numberSlide: true,
    })
);

