import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/guard/roles-auth.decorator';
import { RolesAuthGuard } from 'src/guard/roles-auth.guard';
import { RolesEnum } from 'src/guard/roles.enum';
import { CreateProductDto, UpdateProductDto } from './dto/request-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('/')
    async getProductById(@Query('id') productId: string) {
        return this.productsService.getProductById(productId)
    }

    @Get('/all')
    async getAllIds() {
        return this.productsService.getAll()
    }

    
    @Get('/summary')
    async getSummaryById(@Query('id') productId: string) {
        return this.productsService.getSummaryById(productId)
    }

    @Get('/category')
    async getAllProductsOfCategory(@Query('category') category: string) {
        return this.productsService.getAllProductsOfCategory(category)
    }

    @Post('/')
    @UseInterceptors(FilesInterceptor('images'))
    @UseGuards(RolesAuthGuard)
    @Roles(RolesEnum.Admin)
    async createProduct(@Body() createProductDto: CreateProductDto, @UploadedFiles() images) {
        return this.productsService.create(createProductDto, images)
    }

    @Patch('/')
    @UseGuards(RolesAuthGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Roles(RolesEnum.Admin)
    async updateProduct(@Body() updateProductDto: UpdateProductDto, @UploadedFiles() images) {
        return this.productsService.updateProduct(updateProductDto, images)
    }

    @Delete('/')
    @UseGuards(RolesAuthGuard)
    @Roles(RolesEnum.Admin)
    async deleteProduct(@Query('id') productId: string) {
        return this.productsService.deleteProduct(productId)
    }    

    @Get('/categories')
    async getCategories() {
        return this.productsService.getCategories()
    }

}
