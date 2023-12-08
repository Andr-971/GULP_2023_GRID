
const range = document.querySelector(".number");
const rangeNum = document.querySelector(".range-num");
range.oninput = function (event) {
    // console.log(this.value);
    let res = rangeNum.style.left = this.value - 2.2 + "%";
    console.log(res);
};