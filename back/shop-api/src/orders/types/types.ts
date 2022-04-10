export interface Shop {
    id: string
    address: string
}

const Tablets: Shop = {
    name: 'Планшеты',
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
    Smartphones, Tablets
]

