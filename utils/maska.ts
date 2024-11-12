// Настройка патернов v-mask
// А: Включает в себя все симловы, кроме пробелов и отступов - используется для поля Почта
// В: Включает в себя только символы русского и английского алфавитов - используется для поля Имя
export const options = {
    tokens: {
        A: {
            pattern: /\S/,
            multiple: true,
        },
        B: {
            pattern: /[A-Za-zА-Яа-я]/,
            multiple: true,
        },
    },
}

// Отвечает за выбор паттерна ввода для разные типов
export function getMaskaPatern(type: string) {
    switch (type) {
        case 'tel':
            return '+# (###) ###-##-##'
        case 'text':
            return 'B'
    }
    return 'A'
}