

let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("left").max;

const sliderLeft = document.querySelector('#left');
const sliderRight = document.querySelector("#right");

const valueOutputMin = document.querySelector(".value-outputMin"); 
const valueOutputMax = document.querySelector(".value-outputMax"); 

valueOutputMin.innerHTML = sliderLeft.value; // Выводит значение по дефолту
valueOutputMax.innerHTML = sliderRight.value; // Выводит значение по дефолту

sliderLeft.oninput = function () {
    valueOutputMin.innerHTML = this.value; // Выводит значение левого ползунка
    fillColor();
};
sliderRight.oninput = function () {
    valueOutputMax.innerHTML = this.value; // Выводит значение правого ползунка
    fillColor();
};
function fillColor() {
    percent1 = (sliderLeft.value / sliderMaxValue) * 100;
    percent2 = (sliderRight.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}
