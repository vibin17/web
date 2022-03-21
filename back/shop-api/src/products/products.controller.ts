import { Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ENV_PATH } from 'src/consts';
import { Roles } from 'src/guard/roles-auth.decorator';
import { RolesAuthGuard } from 'src/guard/roles-auth.guard';
import { RolesEnum } from 'src/guard/roles.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ValidationPipe } from './validation/validation';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get(':id')
    async get(@Param('id') productId) {
        return this.productsService.getById(productId)
    }

    @Get()
    async getAll() {
        return this.productsService.getAll()
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @UsePipes(ValidationPipe)
    // @UseGuards(RolesAuthGuard)
    // @Roles()
    async createProduct(@Body() createProductDto: CreateProductDto, @UploadedFiles() images) {
        return this.productsService.create(createProductDto, images)
    }
    
}
