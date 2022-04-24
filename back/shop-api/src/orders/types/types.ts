export enum OrderTypes {
    Delivery = 'DELIVERY', 
    Pickup = 'PICKUP'
}

export enum PaymentTypes {
    OnDelivery = 'ON_DELIVERY', 
    Online = 'ONLINE'
}

export type Shop = {
    address: string
}

export const Shops: Shop[] = [
    {
        address: 'ТЦ Маркет-Молл, ул. Центральная 9/2, этаж 2'
    },
    {
        address: 'ТЦ Мега, ул. Василевского 40'
    }
]
