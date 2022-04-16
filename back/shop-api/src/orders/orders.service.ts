import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { lastValueFrom, timeout } from 'rxjs';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';
import { CreateOrderDto, UserIdDto } from './dto/request-order.dto';
import { ResponseOrderDto } from './dto/response-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
    constructor(@Inject('AUTH_CLIENT') private readonly client: ClientProxy,
                @InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

    async create(authHeader: string, createOrderDto: CreateOrderDto): Promise<ResponseOrderDto> {
        const token = authHeader.split(' ')[1]
        let response = await (lastValueFrom<UserIdDto>(this.client.send({
            role: 'users',
            cmd: 'get'
        }, {
            access: token
        }).pipe(timeout(2000)))).catch(error => { 
            throw new HttpException('Авторизация не пройдена', HttpStatus.UNAUTHORIZED)
        })
        let {
            _id,
            user, 
            products,
            orderType,
            orderDate,
            deliveryAddress,
            paymentType
        } = await new this.orderModel({
            user: response.userId,
            products: createOrderDto.products,
            orderType: createOrderDto.orderType,
            orderDate: createOrderDto.orderDate,
            deliveryAddress: createOrderDto.deliveryAddress,
            paymentType: createOrderDto.paymentType
        }).save()

        let order: ResponseOrderDto = {
            _id,
            user, 
            products,
            orderType,
            orderDate,
            deliveryAddress,
            paymentType 
        }

        return order
    }

    async getAllOfUser(authHeader: string): Promise<ResponseOrderDto[]> {
        const token = authHeader.split(' ')[1]
        let response = await (lastValueFrom<UserIdDto>(this.client.send({
            role: 'users',
            cmd: 'get'
        }, {
            access: token
        }).pipe(timeout(2000)))).catch(error => { 
            throw new HttpException('Авторизация не пройдена', HttpStatus.UNAUTHORIZED)
        })

        let orders = this.orderModel.find({ user: response.userId }).select('-__v')

        return orders
    }

}
