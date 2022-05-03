export type Rating = {
    '5': number
    '4': number
    '3': number
    '2': number
    '1': number
}

export type Prop = {
    name: string
    filter?: boolean
    bool?: boolean
}

export interface Category {
    name: string,
    route: string,
    props: Prop[]
}

const Smartphones: Category = {
    name: 'Смартфоны',
    route: 'smartphones',
    props: [
        {
            name: 'Баллы Antutu',
        },
        {
            name: 'Диагональ экрана',
        },
        {
            name: 'Тип матрицы',
            filter: true
        },
        {
            name: 'Разрешение экрана',
        },
        {
            name: 'Операционная система',
            filter: true
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
            filter: true,
            bool: true
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
    route: 'tablets',
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

