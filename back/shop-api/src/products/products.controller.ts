import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ENV_PATH } from 'src/consts';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    async createProduct(@Body() createProductDto: CreateProductDto, @UploadedFiles() images) {
        return this.productsService.createProduct(createProductDto, images)
    }
    
}
