import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guard/roles-auth.decorator';
import { RolesAuthGuard } from 'src/guard/roles-auth.guard';
import { RolesEnum } from 'src/guard/roles.enum';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private OrdersSerivce: OrdersService) {}

    @Post('/')
    @UseGuards(RolesAuthGuard)
    @Roles(RolesEnum.Admin)
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createProductDto)
    }

}
