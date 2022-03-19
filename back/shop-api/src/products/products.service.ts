import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { categories } from './types/types';
import { FilesService } from 'src/files/files.service';
import { ResponseProductDto } from './dto/response-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>,
        private filesService: FilesService) {}

    async createProduct(createProductDto: CreateProductDto, images: any): Promise<ResponseProductDto> {
        let fileNames: string[] = []
        console.log(images)
        for (let image of images) {
            let fileName = await this.filesService.createFile(image)
            fileNames.push(fileName)
        }
        const productCategory = categories.find(x => x.name === createProductDto.categoryName)
        const newProduct = new this.productModel({ ...createProductDto, category: productCategory })
        const { productName, releaseYear, category } = await newProduct.save()
        const product = { productName, releaseYear, category, fileNames }
        return product
    }

}
