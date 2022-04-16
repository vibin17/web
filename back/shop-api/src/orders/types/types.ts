export enum OrderTypes {
    Delivery = 'DELIVERY', 
    Pickup = 'PICKUP'
}

export enum PaymentTypes {
    OnDelivery = 'ON_DELIVERY', 
    Online = 'ONLINE'
}

export interface User {
    userName: string
    phoneNumber: string
}
