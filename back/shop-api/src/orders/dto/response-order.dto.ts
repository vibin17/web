export class ResponseOrderDto {
    _id: string
    user: string
    products: string[]
    orderType: string
    orderDate: Date
    deliveryAddress: string
    paymentType: string
    price: number
}