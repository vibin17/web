export type Rating = {
    '5': number
    '4': number
    '3': number
    '2': number
    '1': number
}

export const defaultCriterias = [
    'Цена', 'Производитель', 'Пользовательский рейтинг', 'Год выпуска'
]

export enum PropCompareTypes {
    NUMBER_UP = 'u',
    NUMBER_DOWN = 'd',
    PREFERENCE = 'p',
    BINARY = 'b'
}

export type Prop = {
    name: string
    bool?: boolean
    filter?: boolean
    bestValue?: string[]
    compareType?: PropCompareTypes
    tiers?: [number, number][] //for number types
}

export interface Category {
    name: string,
    route: string,
    props: Prop[],
    priceCategories?: number[][]
}

const Smartphones: Category = {
    name: 'Смартфоны',
    route: 'smartphones',
    props: [ //ОЧИСТИТЬ БД ЕСЛИ ДОБАВЛЯТЬ НОВЫЕ
        {
            name: 'Баллы Antutu',
            compareType: PropCompareTypes.NUMBER_UP,
            tiers: [
                     [0, 350000],
                [350000, 550000],
                [550000, 800000],
                [800000, 1000000]
            ]
        },
        {
            name: 'Диагональ экрана',
            compareType: PropCompareTypes.NUMBER_UP,
        },
        {
            name: 'Тип матрицы',
            filter: true,
            compareType: PropCompareTypes.PREFERENCE
        },
        {
            name: 'Разрешение экрана'
        },
        {
            name: 'Операционная система',
            filter: true,
            compareType: PropCompareTypes.PREFERENCE
        },
        {
            name: 'Процессор',
        },
        {
            name: 'Конфигурация процессора',
        },
        {
            name: 'Оперативная память, гб',
        },
        {
            name: 'Встроенная память, гб',
        },
        {
            name: 'NFC',
            bestValue: ['Есть', 'есть'],
            compareType: PropCompareTypes.BINARY,
            filter: true,
            bool: true
        },
        {
            name: 'Емкость аккумулятора, мАч'
        },
        {
            name: 'Время работы, ч',
            compareType: PropCompareTypes.NUMBER_UP,
        },
        {
            name: 'Основная камера',
        },
        {
            name: 'Фронтальная камера'
        }
    ],
    priceCategories: [
            [0, 11000],
        [11000, 17000],
        [17000, 30000],
        [30000, 60000],
       [60000, 200000]
    ]
}

const TVs: Category = {
    name: 'Телевизоры',
    route: 'tvs', 
    props: [
        {
            name: 'Тип матрицы',
            compareType: PropCompareTypes.PREFERENCE
        },
        {
            name: 'Диагональ экрана',
            compareType: PropCompareTypes.NUMBER_UP
        },
        {
            name: 'Разрешение экрана',
            compareType: PropCompareTypes.NUMBER_UP
        },
        {
            name: 'HDR'
        },
        {
            name: 'Wi-Fi',
            filter: true,
            bestValue: ['Встроенный']
        }
    ]
}

const Headphones: Category = {
    name: 'Наушники',
    route: 'headphones',
    props: [
        {
            name: 'Поддерживаемое разрешение'
        }
    ]
}

const Consoles: Category = {
    name: 'Игровые консоли',
    route: 'gaming-consoles',
    props: [
        {
            name: 'Поддерживаемое разрешение'
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
    Headphones,
    Smartphones, Tablets, Consoles, TVs
]

