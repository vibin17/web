import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model, Document } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { categories } from './types/types';
import { FilesService } from 'src/files/files.service';
import { ResponseProductDto, ResponseProductSummaryDto } from './dto/response-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>,
        private filesService: FilesService) {}

    async create(createProductDto: CreateProductDto, imageFiles: any): Promise<ResponseProductDto> {
        const existingProduct: Product = await this.productModel.findOne({ productName: createProductDto.productName })

        if (existingProduct) {
            throw new HttpException('Товар с таким названием уже существует', HttpStatus.BAD_REQUEST)
        }

        const productCategory = categories.find(x => x.name === createProductDto.categoryName)
        if (!productCategory) {
            throw new HttpException('Такой категории товаров не существует', HttpStatus.BAD_REQUEST)
        }

        let fileNames: string[] = []
        for (let image of imageFiles) {
            let fileName = await this.filesService.createFile(image)
            fileNames.push(fileName)
        }
        
        const newProduct = new this.productModel({ ...createProductDto, category: productCategory, imagePaths: fileNames })
        const { productName, releaseYear, price, category, rating, imagePaths, _id, props } = await newProduct.save()
        const product: ResponseProductDto = { _id, productName, releaseYear, price, category, imagePaths, props, rating }
                    
        return product
    }
    
    async getSummaryById(productId: string): Promise<ResponseProductSummaryDto> {
        const { productName, imagePaths, price, _id } = await this.productModel.findById(productId)
        const imagePath: string = imagePaths[0]
        const product: ResponseProductSummaryDto = { _id, productName, price, imagePath }
        if (!product) {
            throw new HttpException('Товар с таким ID не найден', HttpStatus.BAD_REQUEST)
        }

        return product
    }

    async getAll(): Promise<ResponseProductDto[]>  {
        const products: ResponseProductDto[] = await this.productModel.find({}, '_id')

        return products
    }

}
