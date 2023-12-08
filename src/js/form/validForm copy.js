
document.addEventListener("DOMContentLoaded", function () {
    let elForm = {
        img: {
            hideEye: "",
            showEye: "",
        },
        styleShowWin: {
            add: `background-color: #fff;padding: 8px;box-shadow: 5px 3px 5px 3px rgba(0, 0, 0, .5);border-radius: 7px;z-index: 100`,
        },
        arrayInputs: [],
    };
    elForm.img.width = 20;
    elForm.img.height = 20;
    elForm.img.classHideEye = "hideEye";
    elForm.img.colorHideEye = "#ccc";
    elForm.img.classShowEye = "showEye";
    elForm.img.colorShowEye = "#000";
    elForm.img.hideEye = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="${elForm.img.colorHideEye}" width="${elForm.img.width}px" height="${elForm.img.height}px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" class="${elForm.img.classHideEye}">
    <title>Показать пароль</title>
    <path d="M18.37,11.17A6.79,6.79,0,0,0,16,11.6l8.8,8.8A6.78,6.78,0,0,0,25.23,18,6.86,6.86,0,0,0,18.37,11.17Z"></path>
    </path>
    <path d="M34.29,17.53c-3.37-6.23-9.28-10-15.82-10a16.82,16.82,0,0,0-5.24.85L14.84,10a14.78,14.78,0,0,1,3.63-.47c5.63,0,10.75,3.14,13.8,8.43a17.75,17.75,0,0,1-4.37,5.1l1.42,1.42a19.93,19.93,0,0,0,5-6l.26-.48Z"></path>
    <path d="M4.87,5.78l4.46,4.46a19.52,19.52,0,0,0-6.69,7.29L2.38,18l.26.48c3.37,6.23,9.28,10,15.82,10a16.93,16.93,0,0,0,7.37-1.69l5,5,1.75-1.5-26-26Zm8.3,8.3a6.85,6.85,0,0,0,9.55,9.55l1.6,1.6a14.91,14.91,0,0,1-5.86,1.2c-5.63,0-10.75-3.14-13.8-8.43a17.29,17.29,0,0,1,6.12-6.3Z"></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect>
    </svg>
`;
    elForm.img.showEye = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="${elForm.img.colorShowEye}" width="${elForm.img.width}px" height="${elForm.img.height}px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" class="${elForm.img.classShowEye}">
    <title>Скрыть пароль</title>
    <path d="M33.62,17.53c-3.37-6.23-9.28-10-15.82-10S5.34,11.3,2,17.53L1.72,18l.26.48c3.37,6.23,9.28,10,15.82,10s12.46-3.72,15.82-10l.26-.48ZM17.8,26.43C12.17,26.43,7,23.29,4,18c3-5.29,8.17-8.43,13.8-8.43S28.54,12.72,31.59,18C28.54,23.29,23.42,26.43,17.8,26.43Z"></path>
    <circle cx="18.09" cy="18.03" r="6.86"></circle>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect>
    </svg> 
`;
    function validForm(element, options = {}) {
        const formNode = element;
        const inputs = formNode.querySelectorAll(
            "input[data-rule],textarea[data-rule]"
        );
        const arrayInputs = Array.from(inputs);
        elForm.formNode = formNode;
        elForm.arrayInputs = arrayInputs;

        let stylewin = options.stylewin;
        let passText = options.pass.passText;
        let passTextduble = options.passduble.passText;
        let username = options.username;
        let userlogin = options.userlogin;
        let email = options.email;
        let telephone = options.telephone;
        let pass = options.pass;
        let passduble = options.passduble;
        let textarea = options.textarea;
        let smallHint = true;
        let progress = options.username.progress;
        let progressLogin = options.userlogin.progress;
        let progressEmail = options.email.progressEmail;
        let progressPass = options.pass.progressPass;
        let progressPassdubl = options.passduble.progressPass;
        let textProgress;
        let usernameAlways;
        let emailAlways;
        let telephoneAlways;
        let passAlways;
        let passdubleAlways;
        let textareaAlways;
        let sign;
        let signBul;
        let signBullogin;
        let signBultelePhone = false;
        let signBulTextarea = false;
        let textBul;
        let textBullogin;
        let textBultelePhone = false;
        let textBulTextarea = false;
        let textAlways;
        let success;
        let successEmail;
        let successPass;
        let successPassduble;
        let error;
        let errorEmail;
        let errorPass;
        let errorPassduble;
        let processing;
        let processingEmail;
        let processingPass;
        let processingPassduble;
        let regexName;
        let regexLogin;
        let regexEmail;
        let regexPass;
        let regexTextarea;
        let requiredUsername;
        let requiredUserlogin;
        let requiredEmail;
        let requiredTelephone;
        let requiredPass;
        let requiredPassduble;
        let requiredTextarea;
        let telephoneMask;
        // Параметры username
        if (typeof username !== "undefined") {
            usernameAlways = options.username.always;
            regexName = options.username.regex;

            if (typeof usernameAlways !== "undefined") {
                requiredUsername = true;
            }
            if (requiredUsername) {
                sign = options.username.always.sign;
                signBul = true;
                sign === ""
                    ? (sign = "⚹")
                    : (sign = options.username.always.sign);
            }
            if (requiredUsername) {
                textAlways = options.username.always.text;
                textBul = true;
                textAlways === ""
                    ? (textAlways = "")
                    : (textAlways = options.username.always.text);
            }
            if (typeof progress !== "undefined") {
                textProgress = options.username.progress.textProgress;
                if (typeof textProgress !== "undefined") {
                    success = options.username.progress.textProgress.success;
                    error = options.username.progress.textProgress.error;
                    processing =
                        options.username.progress.textProgress.processing;
                    textProgress = true;
                    success === "" ? (success = "") : (success = success);
                    error === "" ? (error = "") : (error = error);
                    processing === ""
                        ? (processing = "")
                        : (processing = processing);
                }
            }
            if (typeof regexName !== "undefined") {
                // regex = true;
                regexName === ""
                    ? (regexName = "^([а-яА-ЯёЁa-zA-Z-?_?]{3,20})$")
                    : (regexName = regexName);
            }
        }
        // Параметры login
        if (typeof userlogin !== "undefined") {
            userloginAlways = options.userlogin.always;
            sign = options.userlogin.always.sign;
            textAlways = options.userlogin.always.text;
            regexLogin = options.userlogin.regex;

            if (typeof userloginAlways !== "undefined") {
                requiredUserlogin = true;
            }
            if (typeof sign !== "undefined") {
                signBullogin = true;
                sign === ""
                    ? (sign = "⚹")
                    : (sign = options.userlogin.always.sign);
            }
            if (typeof textAlways !== "undefined") {
                textBullogin = true;
                textAlways === ""
                    ? (textAlways = "")
                    : (textAlways = options.userlogin.always.text);
            }

            if (typeof progressLogin !== "undefined") {
                textProgress = options.userlogin.progress.textProgress;
                if (typeof textProgress !== "undefined") {
                    success = options.userlogin.progress.textProgress.success;
                    error = options.userlogin.progress.textProgress.error;
                    processing =
                        options.userlogin.progress.textProgress.processing;
                    textProgress = true;
                    success === "" ? (success = "") : (success = success);
                    error === "" ? (error = "") : (error = error);
                    processing === ""
                        ? (processing = "")
                        : (processing = processing);
                }
            }
            if (typeof regexLogin !== "undefined") {
                // regex = true;
                regexLogin === ""
                    ? (regexLogin = "^([A-Za-z-_+=.0-9]){4,15}$")
                    : (regexLogin = regexLogin);
            }
        }
        // Параметры email
        if (typeof email !== "undefined") {
            emailAlways = options.email.always;
            regexEmail = options.email.regex;
            if (typeof emailAlways !== "undefined") {
                requiredEmail = true;
            }
            if (requiredEmail) {
                sign = options.email.always.sign;
                signBul = true;
                sign === "" ? (sign = "⚹") : (sign = options.email.always.sign);
            }
            if (requiredEmail) {
                textAlways = options.email.always.text;
                textBul = true;
                textAlways === ""
                    ? (textAlways = "")
                    : (textAlways = options.email.always.text);
            }
            if (typeof progressEmail !== "undefined") {
                successEmail = options.email.progressEmail.success;
                errorEmail = options.email.progressEmail.error;
                processingEmail = options.email.progressEmail.processing;
                successEmail === ""
                    ? (successEmail = "")
                    : (successEmail = successEmail);
                errorEmail === ""
                    ? (errorEmail = "")
                    : (errorEmail = errorEmail);
                processingEmail === ""
                    ? (processingEmail = "")
                    : (processingEmail = processingEmail);
            }
            if (typeof regexEmail !== "undefined") {
                // regex = true;
                regexEmail === ""
                    ? (regexEmail =
                          "^[a-zA-Z0-9-_.#+%*]{1,20}@[a-zA-Z_]{3,20}.[a-zA-Z]{2,3}$")
                    : (regexEmail = regexEmail);
            }
        }
        // Параметры telephone
        if (typeof telephone !== "undefined") {
            telephoneAlways = options.telephone.always;
            telephoneMask = options.telephone.mask;
            if (typeof telephoneAlways !== "undefined") {
                requiredTelephone = true;
            }
            if (requiredTelephone) {
                sign = options.telephone.always.sign;
                if (typeof sign !== "undefined") {
                    signBultelePhone = true;
                    sign === ""
                        ? (sign = "⚹")
                        : (sign = options.telephone.always.sign);
                }
            }
            if (requiredTelephone) {
                textAlways = options.telephone.always.text;
                if (typeof textAlways !== "undefined") {
                    textBultelePhone = true;
                    textAlways === ""
                        ? (textAlways = "")
                        : (textAlways = options.telephone.always.text);
                }
            }
            if (typeof telephoneMask !== "undefined") {
                telephoneMask === ""
                    ? (telephoneMask = "+7 (___) __ __ ___")
                    : (telephoneMask = telephoneMask);
            }
        }
        // Параметры пароль
        if (typeof pass !== "undefined") {
            passAlways = options.pass.always;
            regexPass = options.pass.regex;
            if (typeof passAlways !== "undefined") {
                requiredPass = true;
            }
            if (requiredPass) {
                sign = options.pass.always.sign;
                signBul = true;
                sign === "" ? (sign = "⚹") : (sign = options.pass.always.sign);
            }
            if (requiredPass) {
                textAlways = options.pass.always.text;
                textBul = true;
                textAlways === ""
                    ? (textAlways = "")
                    : (textAlways = options.pass.always.text);
            }
            if (typeof progressPass !== "undefined") {
                successPass = options.pass.progressPass.success;
                errorPass = options.pass.progressPass.error;
                processingPass = options.pass.progressPass.processing;
                successPass === ""
                    ? (successPass = "")
                    : (successPass = successPass);
                errorPass === "" ? (errorPass = "") : (errorPass = errorPass);
                processingPass === ""
                    ? (processingPass = "")
                    : (processingPass = processingPass);
            }
            if (typeof regexPass !== "undefined") {
                // regex = true;
                regexPass === ""
                    ? (regexPass = "^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$")
                    : (regexPass = regexPass);
            }
        }
        // Параметры повтора пароля
        if (typeof passduble !== "undefined") {
            passdubleAlways = options.passduble.always;
            regexPassduble = options.passduble.regex;
            if (typeof passdubleAlways !== "undefined") {
                requiredPassduble = true;
            }
            if (requiredPassduble) {
                sign = options.passduble.always.sign;
                signBul = true;
                sign === ""
                    ? (sign = "⚹")
                    : (sign = options.passduble.always.sign);
            }
            if (requiredPassduble) {
                textAlways = options.passduble.always.text;
                textBul = true;
                textAlways === ""
                    ? (textAlways = "")
                    : (textAlways = options.passduble.always.text);
            }
            if (typeof progressPassdubl !== "undefined") {
                successPassduble = options.passduble.progressPass.success;
                errorPassduble = options.passduble.progressPass.error;
                processingPassduble = options.passduble.progressPass.processing;
                successPassduble === ""
                    ? (successPassduble = "")
                    : (successPassduble = successPassduble);
                errorPassduble === ""
                    ? (errorPassduble = "")
                    : (errorPassduble = errorPassduble);
                processingPassduble === ""
                    ? (processingPassduble = "")
                    : (processingPassduble = processingPassduble);
            }
        }
        // Параметры textarea
        if (typeof textarea !== "undefined") {
            textareaAlways = options.textarea.always;
            regexTextarea = options.textarea.regex;
            if (typeof textareaAlways !== "undefined") {
                requiredTextarea = true;
            }
            if (requiredTextarea) {
                sign = options.textarea.always.sign;
                signBulTextarea = true;
                sign === ""
                    ? (sign = "⚹")
                    : (sign = options.textarea.always.sign);
            }
            if (requiredTextarea) {
                textAlways = options.textarea.always.text;
                textBulTextarea = true;
                textAlways === ""
                    ? (textAlways = "")
                    : (textAlways = options.textarea.always.text);
            }
            if (typeof regexTextarea !== "undefined") {
                // regex = true;
                regexTextarea === ""
                    ? (regexTextarea = "[А-ЯЁа-яё]{0,50}[^<a-z></a-z>]+")
                    : (regexTextarea = regexTextarea);
            }
        }
        if (smallHint) {
            inputs.forEach(function (item, index) {
                let smallText = document.createElement("small");
                smallText.className = `smallHint`;
                item.before(smallText);
            });
        }
        // Подключение HTML
        inputs.forEach(function (item, index) {
            let rule = item.dataset.rule;
            let el = item;
            switch (rule) {
                case "username":
                    usernameHTML(el);
                    break;
                case "userlogin":
                    userloginHTML(el);
                    break;
                case "email":
                    emailHTML(el);
                    break;
                case "telephone":
                    telephoneHTML(el);
                    break;
                case "pass":
                    passHTML(el);
                    break;
                case "passduble":
                    passdubleHTML(el);
                    break;
                case "textarea":
                    textareaHTML(el);
                    break;
                default:
                    console.log("Таких правил HTML нет!");
            }
        });
        // HTML username
        function usernameHTML(el) {
            if (requiredUsername) {
                el.dataset.required = "true";
                let label = el.offsetParent.childNodes[1];
                if (textBul) {
                    let small = document.createElement("small");
                    small.className = "text";
                    small.textContent = textAlways;
                    label.prepend(small);
                }
                if (signBul) {
                    let span = document.createElement("span");
                    span.className = "sign";
                    span.textContent = sign;
                    label.prepend(span);
                }
            }
            if (textProgress) {
                let input = el;
                let small = document.createElement("small");
                small.className = "progress";
                input.after(small);
            }
        }
        // HTML userlogin
        function userloginHTML(el) {
            if (requiredUserlogin) {
                el.dataset.required = "true";
                let label = el.offsetParent.childNodes[1];
                if (textBullogin) {
                    let small = document.createElement("small");
                    small.className = "text";
                    small.textContent = textAlways;
                    label.prepend(small);
                }
                if (signBullogin) {
                    let span = document.createElement("span");
                    span.className = "sign";
                    span.textContent = sign;
                    label.prepend(span);
                }
            }
            if (textProgress) {
                let input = el;
                let small = document.createElement("small");
                small.className = "progress";
                input.after(small);
            }
        }
        // HTML email
        function emailHTML(el) {
            if (requiredEmail) {
                el.dataset.required = "true";
                let label = el.offsetParent.childNodes[1];
                if (textBul) {
                    let small = document.createElement("small");
                    small.className = "text";
                    small.textContent = textAlways;
                    label.prepend(small);
                }
                if (signBul) {
                    let span = document.createElement("span");
                    span.className = "sign";
                    span.textContent = sign;
                    label.prepend(span);
                }
            }
            if (textProgress) {
                let input = el;
                let small = document.createElement("small");
                small.className = "progress";
                input.after(small);
            }
        }
        // HTML telephone
        function telephoneHTML(el) {
            if (requiredTelephone) {
                el.dataset.required = "true";
                let label = el.offsetParent.childNodes[1];
                if (textBultelePhone) {
                    let small = document.createElement("small");
                    small.className = "text";
                    small.textContent = textAlways;
                    label.prepend(small);
                }
                if (signBultelePhone) {
                    let span = document.createElement("span");
                    span.className = "sign";
                    span.textContent = sign;
                    label.prepend(span);
                }
            }
        }
        // HTML pass
        function passHTML(el) {
            if (requiredPass) {
                el.dataset.required = "true";
                let label = el.offsetParent.childNodes[1];
                if (textBul) {
                    let small = document.createElement("small");
                    small.className = "text";
                    small.textContent = textAlways;
                    label.prepend(small);
                }
                if (signBul) {
                    let span = document.createElement("span");
                    span.className = "sign";
                    span.textContent = sign;
                    label.prepend(span);
                }
            }
            if (textProgress) {
                let input = el;
                let small = document.createElement("small");
                small.className = "progress";
                input.after(small);
            }
            if (passText) {
                let field = el.offsetParent;
                let span = document.createElement("span");
                span.className = "hidePass";
                field.append(span);
                elForm.hideShowPass = span;
                elForm.hideShowPass.innerHTML = elForm.img.hideEye;

                elForm.hideShowPass.onclick = function (e) {
                    if (
                        this.offsetParent.childNodes[7].childNodes[1].classList.contains(
                            "hideEye"
                        )
                    ) {
                        this.offsetParent.childNodes[4].setAttribute(
                            "type",
                            "text"
                        );
                        this.offsetParent.childNodes[7].innerHTML =
                            elForm.img.showEye;
                    } else if (
                        this.offsetParent.childNodes[7].childNodes[1].classList.contains(
                            "showEye"
                        )
                    ) {
                        this.offsetParent.childNodes[4].setAttribute(
                            "type",
                            "password"
                        );
                        this.offsetParent.childNodes[7].innerHTML =
                            elForm.img.hideEye;
                    }
                };
            }
        }
        // HTML passduble
        function passdubleHTML(el) {
            if (requiredPassduble) {
                el.dataset.required = "true";
                let label = el.offsetParent.childNodes[1];
                if (textBul) {
                    let small = document.createElement("small");
                    small.className = "text";
                    small.textContent = textAlways;
                    label.prepend(small);
                }
                if (signBul) {
                    let span = document.createElement("span");
                    span.className = "sign";
                    span.textContent = sign;
                    label.prepend(span);
                }
            }
            if (textProgress) {
                let input = el;
                let small = document.createElement("small");
                small.className = "progress";
                input.after(small);
            }
            if (passTextduble) {
                let field = el.offsetParent;
                let span = document.createElement("span");
                span.className = "hidePassduble";
                field.append(span);
                elForm.hideShowPass = span;
                elForm.hideShowPass.innerHTML = elForm.img.hideEye;
                elForm.hideShowPass.onclick = function () {
                    if (
                        this.offsetParent.childNodes[7].childNodes[1].classList.contains(
                            "hideEye"
                        )
                    ) {
                        this.offsetParent.childNodes[4].setAttribute(
                            "type",
                            "text"
                        );
                        this.offsetParent.childNodes[7].innerHTML =
                            elForm.img.showEye;
                    } else if (
                        this.offsetParent.childNodes[7].childNodes[1].classList.contains(
                            "showEye"
                        )
                    ) {
                        this.offsetParent.childNodes[4].setAttribute(
                            "type",
                            "password"
                        );
                        this.offsetParent.childNodes[7].innerHTML =
                            elForm.img.hideEye;
                    }
                };
            }
        }
        // HTML textarea
        function textareaHTML(el) {
            if (requiredTextarea) {
                el.dataset.required = "true";
                let label = el.offsetParent.childNodes[1];
                if (textBulTextarea) {
                    let small = document.createElement("small");
                    small.classList += "text text-extarea";
                    small.textContent = textAlways;
                    label.prepend(small);
                }
                if (signBulTextarea) {
                    let span = document.createElement("span");
                    span.classList += "sign sign-textarea";
                    span.textContent = sign;
                    label.prepend(span);
                }
            }
        }
        // Событие клик по текущему input удаление placeholder
        arrayInputs.forEach(function (item, index) {
            item.addEventListener("click", function (e) {
                let element = this;
                let savePlaceholder = this.getAttribute("placeholder");
                this.setAttribute("placeholder", "");

                formNode.addEventListener("mouseup", function () {
                    element.setAttribute("placeholder", savePlaceholder);
                });
            });
        });
        // Событие фокус
        arrayInputs.forEach(function (item, index) {
            item.addEventListener("focus", function (e) {
                let focus = true;
                let rule = this.dataset.rule;
                check(focus, this, rule);
            });
        });
        // Событие потеря фокуса
        arrayInputs.forEach(function (item, index) {
            item.addEventListener("blur", function (e) {
                let focus = false;
                let rule = this.dataset.rule;
                check(focus, this, rule);
            });
        });
        // Событие отправки
        formNode.addEventListener("submit", function (e) {
            let smallError = formNode.querySelector(".error-form");
            if (smallError !== null) {
                smallError.remove();
            }
            let button = formNode.querySelector("#button-form");
            let res = completion(arrayInputs);
            if (res) {
                console.log("Успешно отправлено");
            } else {
                e.preventDefault();
                button.insertAdjacentHTML(
                    "beforeBegin",
                    `<small class="error-form error">Проверте правильность заполнение обязательный полей</small>`
                );
            }
        });
        elForm.stylewin = stylewin;
        elForm.processing = processing;
        elForm.processingEmail = processingEmail;
        elForm.processingPass = processingPass;
        elForm.processingPassduble = processingPassduble;
        elForm.error = error;
        elForm.errorEmail = errorEmail;
        elForm.errorPass = errorPass;
        elForm.errorPassduble = errorPassduble;
        elForm.success = success;
        elForm.successEmail = successEmail;
        elForm.successPass = successPass;
        elForm.successPassduble = successPassduble;
        elForm.regexName = regexName;
        elForm.regexLogin = regexLogin;
        elForm.regexEmail = regexEmail;
        elForm.regexPass = regexPass;
        elForm.regexTextarea = regexTextarea;
        elForm.requiredUsername = requiredUsername;
        elForm.requiredUserlogin = requiredUserlogin;
        elForm.requiredEmail = requiredEmail;
        elForm.requiredTelephone = requiredTelephone;
        elForm.requiredPass = requiredPass;
        elForm.requiredPassduble = requiredPassduble;
        elForm.requiredTextarea = requiredTextarea;
        elForm.telephoneMask = telephoneMask;
    }
    // Проверка обязательных полей
    function completion(arrayInputs) {
        let result;
        let lengthrequired = 0;
        let lengthSuccessEnter = 0;
        arrayInputs.forEach(function (item) {
            if (item.dataset.required) {
                lengthrequired++;
                if (item.classList.contains("successEnter")) {
                    lengthSuccessEnter++;
                    if (lengthrequired === lengthSuccessEnter) {
                        result = true;
                    }
                } else {
                    result = false;
                }
            }
        });
        return result;
    }
    // Подключение функций обработки полей
    function check(focus, element, rule, event) {
        switch (rule) {
            case "username":
                username(focus, element);
                break;
            case "userlogin":
                userlogin(focus, element);
                break;
            case "email":
                email(focus, element);
                break;
            case "telephone":
                telephone(focus, element);
                break;
            case "pass":
                pass(focus, element);
                break;
            case "passduble":
                passduble(focus, element);
                break;
            case "textarea":
                textarea(focus, element);
                break;
            default:
                console.log("Таких правил нет!");
        }
    }
    // username
    function username(focus, element) {
        let sign;
        let text;
        let small = element.offsetParent.childNodes[5];
        if (elForm.requiredUsername) {
            sign = element.offsetParent.childNodes[1].childNodes[0];
            text = element.offsetParent.childNodes[1].childNodes[1];
        }
        let hint = element.offsetParent.childNodes[3];
        hint.classList.add("username");
        if (elForm.stylewin) {
            hint.style.cssText += elForm.styleShowWin.add;
        }
        let hintText = element.title;
        let regexInput = elForm.regexName;

        if (focus) {
            hint.innerHTML = hintText;
            if (elForm.stylewin) {
                small.style.cssText += elForm.styleShowWin.add;
            }
            if (small.classList.contains("success"))
                small.classList.remove("success");
            if (small.classList.contains("error"))
                small.classList.remove("error");
            if (elForm.requiredUsername) {
                if (sign.classList.contains("successSign"))
                    sign.classList.remove("successSign");
                if (text.classList.contains("successText"))
                    text.classList.remove("successText");
            }
            small.classList.add("processing");
            small.textContent = elForm.processing;
            let inputValue = {};
            element.addEventListener("input", (e) => {
                inputValue.value = e.target.value;
                reg = new RegExp(regexInput);
                reg.test(inputValue.value);
                if (reg.test(inputValue.value)) {
                    if (small.classList.contains("processing"))
                        small.classList.remove("processing");
                    if (small.classList.contains("error"))
                        small.classList.remove("error");
                    small.classList.add("success");
                    if (elForm.requiredUsername) {
                        sign.classList.add("successSign");
                        text.classList.add("successText");
                    }
                    small.textContent = elForm.success;
                    element.classList.add("successEnter");
                } else {
                    small.classList.remove("processing");
                    if (small.classList.contains("success"))
                        small.classList.remove("success");
                    if (element.classList.contains("successEnter"))
                        element.classList.remove("successEnter");
                    if (elForm.requiredUsername) {
                        if (sign.classList.contains("successSign"))
                            sign.classList.remove("successSign");
                        if (text.classList.contains("successText"))
                            text.classList.remove("successText");
                    }
                    small.classList.add("error");
                    small.textContent = elForm.error;
                }
            });
        }
        if (!focus) {
            small.classList.remove("processing");
            small.textContent = "";
            hint.innerHTML = "";
            if (element.value.length > 20) {
                element.value = "";
            }
            if (elForm.stylewin) {
                hint.style = null;
                small.style = null;
            }
            if (element.value === "") {
                element.classList.remove("successEnter");
                sign.classList.remove("successSign");
                text.classList.remove("successText");
            }
        }
    }
    // userlogin
    function userlogin(focus, element) {
        let sign;
        let text;
        let small = element.offsetParent.childNodes[5];
        if (elForm.requiredUserlogin) {
            sign = element.offsetParent.childNodes[1].childNodes[0];
            text = element.offsetParent.childNodes[1].childNodes[1];
        }
        let hint = element.offsetParent.childNodes[3];
        hint.classList.add("userlogin");
        if (elForm.stylewin) {
            hint.style.cssText += elForm.styleShowWin.add;
        }
        let hintText = element.title;
        let regexInput = elForm.regexLogin;

        if (focus) {
            hint.innerHTML = hintText;
            if (elForm.stylewin) {
                small.style.cssText += elForm.styleShowWin.add;
            }
            if (small.classList.contains("success"))
                small.classList.remove("success");
            if (small.classList.contains("error"))
                small.classList.remove("error");
            if (elForm.requiredUserlogin) {
                if (sign.classList.contains("successSign"))
                    sign.classList.remove("successSign");
                if (text.classList.contains("successText"))
                    text.classList.remove("successText");
            }
            small.classList.add("processing");
            small.textContent = elForm.processing;
            let inputValue = {};

            element.addEventListener("input", (e) => {
                inputValue.value = e.target.value;
                reg = new RegExp(regexInput);
                reg.test(inputValue.value);
                if (reg.test(inputValue.value)) {
                    if (small.classList.contains("processing"))
                        small.classList.remove("processing");
                    if (small.classList.contains("error"))
                        small.classList.remove("error");
                    small.classList.add("success");
                    if (elForm.requiredUserlogin) {
                        sign.classList.add("successSign");
                        text.classList.add("successText");
                    }
                    small.textContent = elForm.success;
                    element.classList.add("successEnter");
                } else {
                    small.classList.remove("processing");
                    if (small.classList.contains("success"))
                        small.classList.remove("success");
                    if (element.classList.contains("successEnter"))
                        element.classList.remove("successEnter");
                    if (elForm.requiredUserlogin) {
                        if (sign.classList.contains("successSign"))
                            sign.classList.remove("successSign");
                        if (text.classList.contains("successText"))
                            text.classList.remove("successText");
                    }
                    small.classList.add("error");
                    small.textContent = elForm.error;
                }
            });
        }
        if (!focus) {
            small.classList.remove("processing");
            small.textContent = "";
            hint.innerHTML = "";
            if (element.value.length > 20) {
                element.value = "";
            }
            if (elForm.stylewin) {
                hint.style = null;
                small.style = null;
            }
            if (element.value === "") {
                element.classList.remove("successEnter");
                sign.classList.remove("successSign");
                text.classList.remove("successText");
            }
        }
    }
    // email
    function email(focus, element) {
        let sign;
        let text;
        let small = element.offsetParent.childNodes[5];
        if (elForm.requiredEmail) {
            sign = element.offsetParent.childNodes[1].childNodes[0];
            text = element.offsetParent.childNodes[1].childNodes[1];
        }
        let hint = element.offsetParent.childNodes[3];
        hint.classList.add("email");
        if (elForm.stylewin) {
            hint.style.cssText += elForm.styleShowWin.add;
        }
        let hintText = element.title;
        if (focus) {
            hint.innerHTML = hintText;
            if (elForm.stylewin) {
                small.style.cssText += elForm.styleShowWin.add;
            }
            if (small.classList.contains("success"))
                small.classList.remove("success");
            if (small.classList.contains("error"))
                small.classList.remove("error");
            if (elForm.requiredEmail) {
                if (sign.classList.contains("successSign"))
                    sign.classList.remove("successSign");
                if (text.classList.contains("successText"))
                    text.classList.remove("successText");
            }
            small.classList.add("processing");
            small.textContent = elForm.processingEmail;
            let inputValue = {};

            element.addEventListener("input", (e) => {
                inputValue.value = e.target.value;
                reg = new RegExp(elForm.regexEmail);
                if (reg.test(inputValue.value)) {
                    if (small.classList.contains("processing"))
                        small.classList.remove("processing");
                    if (small.classList.contains("error"))
                        small.classList.remove("error");
                    small.classList.add("success");
                    if (elForm.requiredEmail) {
                        sign.classList.add("successSign");
                        text.classList.add("successText");
                    }
                    small.textContent = elForm.successEmail;
                    element.classList.add("successEnter");
                } else {
                    small.classList.remove("processing");
                    if (small.classList.contains("success"))
                        small.classList.remove("success");
                    if (element.classList.contains("successEnter"))
                        element.classList.remove("successEnter");
                    if (elForm.requiredEmail) {
                        if (sign.classList.contains("successSign"))
                            sign.classList.remove("successSign");
                        if (text.classList.contains("successText"))
                            text.classList.remove("successText");
                    }
                    small.classList.add("error");
                    small.textContent = elForm.errorEmail;
                }
            });
        }
        if (!focus) {
            small.classList.remove("processing");
            small.textContent = "";
            hint.innerHTML = "";
            if (elForm.stylewin) {
                hint.style = null;
                small.style = null;
            }
            if (element.value === "") {
                element.classList.remove("successEnter");
                sign.classList.remove("successSign");
                text.classList.remove("successText");
            }
        }
    }
    // telephone
    function telephone(focus, element) {
        let sign;
        let text;
        // let small = element.offsetParent.childNodes[5];
        if (elForm.requiredTelephone) {
            sign = element.offsetParent.childNodes[1].childNodes[0];
            text = element.offsetParent.childNodes[1].childNodes[1];
        }
        let hint = element.offsetParent.childNodes[3];
        hint.classList.add("telePhone");
        if (elForm.stylewin) {
            hint.style.cssText += elForm.styleShowWin.add;
        }
        let hintText = element.title;
        if (focus) {
            hint.innerHTML = hintText;
            element.value = element.dataset.first;
            if (element.classList.contains("successEnter"))
                element.classList.remove("successEnter");
            if (elForm.requiredTelephone) {
                if (sign.classList.contains("successSign"))
                    sign.classList.remove("successSign");
                if (text.classList.contains("successText"))
                    text.classList.remove("successText");
            }

            let matrix = elForm.telephoneMask;
            element.addEventListener("input", function (e) {
                let i = 0;
                let def = matrix.replace(/\D/g, "");
                let val = this.value.replace(/\D/g, "");
                let newValue = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) : a;
                });
                i = newValue.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    newValue = newValue.slice(0, i);
                }
                let reg = matrix
                    .substr(0, this.value.length)
                    .replace(/_+/g, function (a) {
                        return "\\d{1," + a.length + "}";
                    })
                    .replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5) {
                    this.value = newValue;
                }

                if (this.value.length === 18) {
                    if (elForm.requiredTelephone) {
                        sign.classList.add("successSign");
                        text.classList.add("successText");
                    }
                    element.classList.add("successEnter");
                }
            });
        }
        if (!focus) {
            if (element.value.length < 18) {
                element.value = "";
            } else if (element.value.length === 18) {
                if (elForm.requiredTelephone) {
                    if (sign.classList.contains("successSign"))
                        sign.classList.remove("successSign");
                    if (text.classList.contains("successText"))
                        text.classList.remove("successText");
                }
                if (elForm.requiredTelephone) {
                    sign.classList.add("successSign");
                    text.classList.add("successText");
                }
            } else if (element.value.length > 18) {
                element.value = "";
            }
            hint.innerHTML = "";
            if (elForm.stylewin) {
                hint.style = null;
            }
            if (element.value === "") {
                element.classList.remove("successEnter");
                sign.classList.remove("successSign");
                text.classList.remove("successText");
            }
        }
    }
    // pass
    function pass(focus, element) {
        let sign;
        let text;
        let small = element.offsetParent.childNodes[5];
        if (elForm.requiredPass) {
            sign = element.offsetParent.childNodes[1].childNodes[0];
            text = element.offsetParent.childNodes[1].childNodes[1];
        }
        let hint = element.offsetParent.childNodes[3];
        hint.classList.add("pass");
        if (elForm.stylewin) {
            hint.style.cssText += elForm.styleShowWin.add;
        }
        let hintText = element.title;
        if (focus) {
            hint.innerHTML = hintText;
            if (elForm.stylewin) {
                small.style.cssText += elForm.styleShowWin.add;
            }
            if (small.classList.contains("success"))
                small.classList.remove("success");
            if (small.classList.contains("error"))
                small.classList.remove("error");
            if (elForm.requiredPass) {
                if (sign.classList.contains("successSign"))
                    sign.classList.remove("successSign");
                if (text.classList.contains("successText"))
                    text.classList.remove("successText");
            }
            small.classList.add("processing");
            small.textContent = elForm.processingPass;
            let inputValue = {};
            element.addEventListener("input", (e) => {
                inputValue.value = e.target.value;
                reg = new RegExp(elForm.regexPass);

                if (reg.test(inputValue.value)) {
                    if (small.classList.contains("processing"))
                        small.classList.remove("processing");
                    if (small.classList.contains("error"))
                        small.classList.remove("error");

                    if (elForm.requiredPass) {
                        sign.classList.add("successSign");
                        text.classList.add("successText");
                    }
                    if (inputValue.value.length >= 6) {
                        small.classList.add("processing");
                        small.textContent = "Слабый пароль";
                    }
                    if (inputValue.value.length >= 8) {
                        small.classList.remove("processing");
                        small.classList.add("success");
                        small.textContent = elForm.successPass;
                    }
                    elForm.pass = inputValue.value;
                    element.classList.add("successEnter");
                } else {
                    small.classList.remove("processing");
                    if (small.classList.contains("success"))
                        small.classList.remove("success");
                    if (element.classList.contains("successEnter"))
                        element.classList.remove("successEnter");
                    if (elForm.requiredPass) {
                        if (sign.classList.contains("successSign"))
                            sign.classList.remove("successSign");
                        if (text.classList.contains("successText"))
                            text.classList.remove("successText");
                    }
                    small.classList.add("error");
                    small.textContent = elForm.errorPass;
                }
            });
        }
        if (!focus) {
            small.classList.remove("processing");
            small.textContent = "";
            hint.innerHTML = "";
            if (elForm.stylewin) {
                hint.style = null;
                small.style = null;
            }
            if (element.value === "") {
                element.classList.remove("successEnter");
                sign.classList.remove("successSign");
                text.classList.remove("successText");
            }
        }
    }
    // passduble
    function passduble(focus, element) {
        let sign;
        let text;
        let password = {};
        let small = element.offsetParent.childNodes[5];

        if (elForm.requiredPassduble) {
            sign = element.offsetParent.childNodes[1].childNodes[0];
            text = element.offsetParent.childNodes[1].childNodes[1];
        }
        let hint = element.offsetParent.childNodes[3];
        // hint.classList.add("pass");
        if (elForm.stylewin) {
            hint.style.cssText += elForm.styleShowWin.add;
        }
        let hintText = element.title;
        if (focus) {
            hint.innerHTML = hintText;
            if (elForm.stylewin) {
                small.style.cssText += elForm.styleShowWin.add;
            }
            elForm.arrayInputs.forEach(function (item, index) {
                let rule = item.dataset.rule;
                let el = item;
                switch (rule) {
                    case "pass":
                        if (el.classList.contains("successEnter")) {
                            password.value = el.value;
                        }
                        break;
                }
            });
            if (small.classList.contains("success"))
                small.classList.remove("success");
            if (small.classList.contains("error"))
                small.classList.remove("error");
            if (elForm.requiredPassduble) {
                if (sign.classList.contains("successSign"))
                    sign.classList.remove("successSign");
                if (text.classList.contains("successText"))
                    text.classList.remove("successText");
            }
            small.classList.add("processing");
            small.textContent = elForm.processingPassduble;
            let inputValue = {};

            element.addEventListener("input", (e) => {
                inputValue.value = e.target.value;
                if (password.value === inputValue.value) {
                    if (small.classList.contains("processing"))
                        small.classList.remove("processing");
                    if (small.classList.contains("error"))
                        small.classList.remove("error");
                    if (elForm.requiredPassduble) {
                        sign.classList.add("successSign");
                        text.classList.add("successText");
                    }
                    small.classList.add("success");
                    small.textContent = elForm.successPassduble;
                    element.classList.add("successEnter");
                } else {
                    small.classList.remove("processing");
                    if (small.classList.contains("success"))
                        small.classList.remove("success");
                    if (element.classList.contains("successEnter"))
                        element.classList.remove("successEnter");
                    if (elForm.requiredPassduble) {
                        if (sign.classList.contains("successSign"))
                            sign.classList.remove("successSign");
                        if (text.classList.contains("successText"))
                            text.classList.remove("successText");
                    }
                    small.classList.add("error");
                    small.textContent = elForm.errorPassduble;
                }
            });
            element.onpaste = function () {
                return false;
            };
        }
        if (!focus) {
            small.classList.remove("processing");
            small.textContent = "";
            hint.innerHTML = "";
            if (elForm.stylewin) {
                hint.style = null;
                small.style = null;
            }
            if (element.value === "") {
                element.classList.remove("successEnter");
                sign.classList.remove("successSign");
                text.classList.remove("successText");
            }
        }
    }
    // textarea
    function textarea(focus, element) {
        let sign;
        let text;
        // let small = element.offsetParent.childNodes[5];
        if (elForm.requiredTextarea) {
            sign = element.offsetParent.childNodes[1].childNodes[0];
            text = element.offsetParent.childNodes[1].childNodes[1];
        }
        let hint = element.offsetParent.childNodes[3];
        hint.classList.add("textarea");
        if (elForm.stylewin) {
            hint.style.cssText += elForm.styleShowWin.add;
        }
        let hintText = element.title;
        let regexInput = elForm.regexTextarea;
        if (focus) {
            hint.innerHTML = hintText;
            if (elForm.requiredTextarea) {
                if (sign.classList.contains("successSign"))
                    sign.classList.remove("successSign");
                if (text.classList.contains("successText"))
                    text.classList.remove("successText");
            }
            if(element.classList.contains("successEnter")) element.classList.remove("successEnter");
            element.addEventListener("keyup", function (e) {
                reg = new RegExp(regexInput);
                console.log(reg.test(e.target.value));
                console.log(reg);
                if (reg.test(e.target.value)) {
                    if (elForm.requiredTextarea) {
                        sign.classList.add("successSign");
                        text.classList.add("successText");
                        element.classList.add("successEnter");
                    }
                } else {
                    e.target.value = e.target.value.slice(0, -1);
                    element.classList.remove("successEnter");
                }
            });
        }
        if (!focus) {
            if (element.value === "") {
                element.classList.remove("successEnter");
                sign.classList.remove("successSign");
                text.classList.remove("successText");
            }
            hint.innerHTML = "";
            if (elForm.stylewin) {
                hint.style = null;
            }
        }
    };

    // Настройки, вызов функции
    validForm(
        document.getElementById("form"),
        (options = {
            // focus: true,
            stylewin: true,
            username: {
                // always: {
                //     sign: "★",
                //     text: "(Обязательное поле)",
                // },
                progress: {
                    textProgress: {
                        success: "Имя соответствует параметрам",
                        error: "Имя не соответствует параметрам",
                        processing: "Пожалуйста, вводите имя",
                    },
                },
                regex: "^([а-яёА-ЯЁ-]{3,10})$",
            },
            userlogin: {
                always: {
                    sign: "★",
                    text: "(Обязательное поле)",
                },
                progress: {
                    textProgress: {
                        success: "Логин соответствует параметрам",
                        error: "Логин не соответствует параметрам",
                        processing: "Пожалуйста, вводите логин",
                    },
                },
                regex: "", // ^([A-Za-z-_+=.0-9]){4,15}$
            },
            email: {
                always: {
                    sign: "★",
                    text: "(Обязательное поле)",
                },
                progressEmail: {
                    success: "Почта соответствует параметрам",
                    error: "Почта не соответствует параметрам",
                    processing: "Пожалуйста, вводите почту",
                },
                regex: "",
            },
            pass: {
                // always: {
                //     sign: "★",
                //     text: "(Обязательное поле)",
                // },
                progressPass: {
                    success: "Надёжный пароль",
                    error: "Пароль не соответствует параметрам",
                    processing: "Пожалуйста, вводите пароль",
                },
                passText: true,
                regex: "^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$", // "^(?=.*d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{6,20}$"
            },
            passduble: {
                // always: {
                //     sign: "★",
                //     text: "(Обязательное поле)",
                // },
                progressPass: {
                    success: "Успешный повтор пароля",
                    error: "Ошибка при повторе пароля",
                    processing: "Пожалуйста, повторите пароль",
                },
                passText: true,
            },
            telephone: {
                always: {
                    sign: "★",
                    text: "(Обязательное поле)",
                },
                mask: "", // +7 (___) __ __ ___
            },
            textarea: {
                always: {
                    sign: "★",
                    text: "(Обязательное поле)",
                },
                regex: "[А-ЯЁа-яё]{0,5}[^<a-z></a-z>]",
            },
        })
    );
}, false);


