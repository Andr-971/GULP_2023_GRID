
const spollers = document.querySelector(".spollers"); // Получить корень споллеров
const spollerItem = document.querySelectorAll( ".spoller-item .spoller-content"); // Получить споллеры и контент

spollers.addEventListener("click", (e) => {
    if (e.target.nodeName !== 'BUTTON') return;
    closeAllSpollers(e.target.nextElementSibling);
    e.target.nextElementSibling.classList.toggle("spoller-active");
    e.target.classList.toggle("btn-active");
});
// Функция закрытия споллеров
function closeAllSpollers(current = null) {

    Array.from(spollerItem).forEach((item) => {
        if (item.parentNode !== current.parentNode) {
            item.classList.remove("spoller-active");
            if (item.previousElementSibling.nodeName === "BUTTON");
            item.previousElementSibling.classList.remove("btn-active");
        }
    });
}
