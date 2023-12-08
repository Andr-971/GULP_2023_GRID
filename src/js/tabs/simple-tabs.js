(function () {
    "use strict";

    class Tabsmenu {
        constructor(tabmenu) {
            this.tabmenu = tabmenu;
            // блоки с контентом для табов
            this.blocks =
                this.tabmenu.nextElementSibling.querySelectorAll(
                    ".container > div"
                );
            // коллекция табов
            this.tabs = this.tabmenu.querySelectorAll("li");
            // вешаем обработчик событий на родительский элемент табов
            this.tabmenu.addEventListener("click", this.swithTab.bind(this));
        }
        swithTab(e) {
            let target = e.target;
            // проверяем, по какому именно элементу таб меню был сделан клик
            // если клик был сделан не по вкладке, которая формируется тэгом <li>,
            // то прекращаем работу функции и переходим в ожидание следующего клика
            if (target.tagName !== "LI") return;
            // индекс вкладки по которой был сделан клик
            const i = [].indexOf.call(this.tabs, target);
            // делаем вкладки неактивными
            for (let tab of this.tabs) {
                tab.classList.remove("tab-active");
            }
            // делаем активной вкладку, по которой был сделан клик
            this.tabs[i].classList.add("tab-active");
            this.switchBloks(i);
        }
        switchBloks(i) {
            // делаем все блоки с контентом невидимыми
            for (let block of this.blocks) {
                block.hidden = true;
            }
            // делаем видимым блок контента, относящийся к активной вкладке
            this.blocks[i].hidden = false;
        }
    }

    // коллекция всех tab menu на странице
    const tabsmenu = document.querySelectorAll(".tabsmenu");
    if (!tabsmenu) return;
    // перебираем полученную коллекцию
    for (let menu of tabsmenu) {
        // создаём экземпляр tab menu
        const tab = new Tabsmenu(menu);
    }

})();
