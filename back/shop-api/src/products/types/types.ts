export type Rating = {
    '5': number
    '4': number
    '3': number
    '2': number
    '1': number
}

export type Prop = {
    name: string
}

export interface Category {
    name: string,
    props: Prop[]
}

const Smartphones: Category = {
    name: 'Смартфоны',
    props: [
        {
            name: 'Баллы Antutu',
        },
        {
            name: 'Диагональ экрана',
        },
        {
            name: 'Тип матрицы',
        },
        {
            name: 'Разрешение экрана',
        },
        {
            name: 'Операционная система', 
        },
        {
            name: 'Процессор',
        },
        {
            name: 'Тактовая частота процессора',
        },
        {
            name: 'Оперативная память, гб',
        },
        {
            name: 'Встроенная память, гб',
        },
        {
            name: 'NFC',
        },
        {
            name: 'Емкость аккумулятора',
        },
        {
            name: 'Основная камера',
        },
        {
            name: 'Фронтальная камера'
        }
    ]
}
const Tablets: Category = {
    name: 'Планшеты',
    props: [
        {
            name: 'Баллы Antutu',
        },
        {
            name: 'Диагональ экрана',
        },
        {
            name: 'Тип матрицы',
        },
        {
            name: 'Разрешение экрана',
        },
        {
            name: 'Операционная система', 
        },
        {
            name: 'Процессор',
        },
        {
            name: 'Тактовая частота процессора',
        },
        {
            name: 'Оперативная память, гб',
        },
        {
            name: 'Встроенная память, гб',
        },
        {
            name: 'NFC',
        },
        {
            name: 'Емкость аккумулятора',
        },
        {
            name: 'Основная камера',
        },
        {
            name: 'Фронтальная камера'
        }
    ]
}


export const categories: Category[] = [
    Smartphones, Tablets
]

