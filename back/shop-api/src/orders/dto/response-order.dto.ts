export class ResponseOrderDto {
    readonly _id: string
    readonly user: string
    readonly products: string[]
    readonly orderType: string
    readonly orderDate: Date
    readonly deliveryAddress: string
    readonly paymentType: string
    readonly price: number
}