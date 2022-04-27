import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/request-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post('/')
    async createOrder(@Headers('authorization') authHeader, @Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(authHeader, createOrderDto)
    }

    @Get('/')
    async getAllOfUser(@Headers('authorization') authHeader) {
        return this.ordersService.getAllOfUser(authHeader)
    }

    @Get('/shops')
    async getShops() {
        return this.ordersService.getShops()
    }
}
