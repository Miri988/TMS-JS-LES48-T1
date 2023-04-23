/* Спросить у пользователя:
Фамилию, имя, отчество РАЗДЕЛЬНО (оператором prompt)
Возраст в годах (оператором prompt)
Пол (оператором confirm, например, “Ваш пол - мужской?”)
Вывести оператором alert анкету пользователя по примеру:
Ваше ФИО:
Ваш возраст в годах:
Ваш возраст в днях:
Через 5 лет вам будет:
Ваш пол:
Вы на пенсии:
PS: (пенсионный возраст: Ж-55 / М-65)
Должна быть валидация для корректности вводимых данных (поле не пустое, возраст цифрой и т.д). 
Оператор alert() должен использоваться ОДИН раз. 
Всё делаем с помощью функций, так как программы в js это либо функции, либо классы.
Валидация должна быть сделана с помощью функции для валидации. И после первой ошибки на первом prompt мы говорим пользователю, 
что была ошибка и даём возможность заполнить поле заново. И так каждый шаг, если какое-то поле не заполнено пользователя дальне не пускаем.
*/

'use strict';

const ERR_INVALID_FORMAT = 'Неверный формат данных';
const ERR_TOO_YOUNG = 'Люди в вашем возрасте ещё читать не умеют';
const ERR_TOO_OLD = 'Вам уже это ни к чему';

function UserParam (title, validation, toConfirm = false) {
    this.title = title;
    this.value = null;
    this.error = null;
    this.validation = validation;
    this.toConfirm = toConfirm;
    this.run = () => {
        this.value = this.toConfirm ? confirm(this.title) : prompt(this.title);
        this.error = this.validation instanceof Function ? this.validation(this.value) : null;
        if (this.error) {
            alert(this.error);
            this.run();
        }
    }
}

const nameValidation = (name) => {
    if (!/^[A-ZА-Я][a-zа-я]+$/.test(name)) return ERR_INVALID_FORMAT;
    return null;
}

const ageValidation = (age) => {
    if (!/^\d+$/.test(age)) return ERR_INVALID_FORMAT;
    const n = parseInt(age);
    if (n < 6) return ERR_TOO_YOUNG;
    if (n > 100) return ERR_TOO_OLD;
    return null;
}

function UserInfo () {
    this.firstName = new UserParam('Укажите ваше имя.', nameValidation);
    this.lastName = new UserParam('Укажите вашу фамилию.', nameValidation);
    this.middleName = new UserParam('Укажите ваше отчество.', nameValidation);
    this.age = new UserParam('Укажите ваш возраст.', ageValidation);
    this.isMale = new UserParam('Ваш пол мужской?', null, true);
    this.run = () => {
        const { firstName: f, lastName: l, middleName: m, age: a, isMale: s } = this;
        for (const v of [f, l, m, a, s]) {
            v.run();
        }
        alert(this.getResultMessage());
    }
    this.getDaysAge = () => {
        return this.age.value * 365;
    }
    this.getAgeAfterFiveYears = () => {
        return this.age.value * 1 + 5;
    }
    this.getIsRetired = () => {
        return this.age.value * 1 >= (this.isMale.value ? 65 : 55);
    }
    this.getResultMessage = () => {
        const { firstName, lastName, middleName, age, isMale } = this;
        return [
            `Имя: ${firstName.value}`,
            `Фамилия: ${lastName.value}`,
            `Отчество: ${middleName.value}`,
            `Возраст: ${age.value}`,
            `Пол: ${isMale.value ? 'мужской' : 'женский'}`,
            `Возраст в днях: ${this.getDaysAge()}`,
            `Через пять лет будет: ${this.getAgeAfterFiveYears()}`,
            `На пенсии: ${this.getIsRetired() ? 'да': 'нет'}`,
        ].join('\n');
    }
}


const userInfo = new UserInfo().run();