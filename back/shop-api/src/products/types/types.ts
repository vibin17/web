export type Rating = {
    '5': number
    '4': number
    '3': number
    '2': number
    '1': number
}

export interface Category {
    name: string,
    props: string[]
}

const Smartphones: Category = {
    name: 'Смартфоны',
    props: [
        'Баллы Antutu',
        'Диагональ экрана',
        'Тип матрицы',
        'Разрешение экрана',
        'Операционная система', 
        'Процессор',
        'Тактовая частота процессора',
        'Оперативная память, гб',
        'Встроенная память, гб',
        'NFC',
        'Емкость аккумулятора',
        'Основная камера',
        'Фронтальная камера'
    ]
}

export const categories: Category[] = [
    Smartphones
]

