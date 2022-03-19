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
        'antutu',
        'screen-size'
    ]
}

export const categories: Category[] = [
    {
        name: 'Смартфоны',
        props: [
            'antutu',
            'screen-size'
        ]
    }
]

