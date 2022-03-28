import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ENV_PATH } from 'src/consts';
import { Roles } from 'src/guard/roles-auth.decorator';
import { RolesAuthGuard } from 'src/guard/roles-auth.guard';
import { RolesEnum } from 'src/guard/roles.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { categories } from './types/types';
import { ValidationPipe } from './validation/validation';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('/categories')
    async getCategories() {
        return this.productsService.getCategories()
    }

    @Get('/all')
    async getAllIds() {
        return this.productsService.getAll()
    }

    @Get('/summary')
    async getSummaryById(@Query('id') productId: string) {
        return this.productsService.getSummaryById(productId)
    }
    @Get('/')
    async getProductById(@Query('id') productId: string) {
        return this.productsService.getProductById(productId)
    }
    @Delete('/')
    async deleteProduct(@Query('id') productId: string) {
        return this.productsService.deleteProduct(productId)
    }
    @Get('/category')
    async getAllOfCategory(@Query('category') category: string) {
        return this.productsService.getAllOfCategory(category)
    }

    @Post('/create')
    @UseInterceptors(FilesInterceptor('images'))
    @UsePipes(ValidationPipe)
    @UseGuards(RolesAuthGuard)
    @Roles(RolesEnum.Admin)
    async createProduct(@Body() createProductDto: CreateProductDto, @UploadedFiles() images) {
        return this.productsService.create(createProductDto, images)
    }
    
}
