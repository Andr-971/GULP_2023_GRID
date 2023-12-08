
const rangeSlider = document.querySelector(".range_slider");
const valueOutput = document.querySelector(".value-output");

valueOutput.innerHTML = rangeSlider.value; // Выводит значение по дефолту

rangeSlider.oninput = function () {
    valueOutput.innerHTML = this.value; // Выводит значение при перемещении
};