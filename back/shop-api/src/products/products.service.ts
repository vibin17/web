import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model, Document } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto, UpdateProductDto } from './dto/request-product';
import { categories, Category } from './types/types';
import { FilesService } from 'src/files/files.service';
import { DeletedProductDto, ResponseProductDto, ResponseProductIdDto, ResponseProductSummaryDto } from './dto/response-product.dto';
import { info } from 'console';

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
        const { productName, manufacturer, releaseYear, price, category, rating, imagePaths, _id, props } = await newProduct.save()
        const product: ResponseProductDto = { _id, productName, manufacturer, releaseYear, price, category, imagePaths, props, rating }
                    
        return product
    }

    async updateProduct(updateProductDto: UpdateProductDto): Promise<ResponseProductDto> {
        const { id, ...updateInfo } = updateProductDto
        const updatedProduct = await this.productModel.findByIdAndUpdate(updateProductDto.id, updateInfo)

        return updatedProduct
    }

    async deleteProduct(productId: string): Promise<DeletedProductDto> {
        const { imagePaths } = await this.productModel.findById(productId)
        let deletedFiles: string[] = []
        for (let imagePath of imagePaths) {
            deletedFiles.push(await this.filesService.deleteFile(imagePath))
        }
        const deletedProduct = await this.productModel.deleteOne({ _id: productId})

        return { deletedFiles, ...deletedProduct }
    }

    async getCategories(): Promise<Category[]> {
        return categories
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

    async getProductById(productId: string): Promise<ResponseProductDto> {
        const { _id, productName, manufacturer, releaseYear, price, rating, category, props, imagePaths } = await this.productModel.findById(productId)
        const imagePath: string = imagePaths[0]
        const product: ResponseProductDto = { _id, productName, manufacturer, releaseYear, price, rating, category, props, imagePaths }
        if (!product) {
            throw new HttpException('Товар с таким ID не найден', HttpStatus.BAD_REQUEST)
        }

        return product
    }

    async getProductsAllOfCategory(categoryName: string): Promise<ResponseProductIdDto[]> {
        const products: ResponseProductIdDto[] = await this.productModel.find({ 'category.name': categoryName }).select({ '_id': 1, 'productName': 1})

        return products
    }



    async getAll(): Promise<ResponseProductIdDto[]> {
        const products: ResponseProductIdDto[] = await this.productModel.find().select({ '_id': 1, 'productName': 1})

        return products
    }

}
