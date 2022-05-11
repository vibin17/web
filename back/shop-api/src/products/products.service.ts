import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CompareProductsDto, CreateProductDto, UpdateProductDto } from './dto/request-product.dto';
import { categories, Category } from './types/types';
import { FilesService } from 'src/files/files.service';
import { DeletedProductDto, ResponseCompareDto, ResponseProductDto, ResponseProductIdDto, ResponseProductSummaryDto } from './dto/response-product.dto';
import { AHP } from './ahp/ahp';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>,
        private filesService: FilesService) {}

    async create(createProductDto: CreateProductDto, imageFiles: any): Promise<ResponseProductDto> {
        const existingProduct: Product = await this.productModel.findOne({ productName: createProductDto.productName })

        if (existingProduct) {
            throw new HttpException('Товар с таким названием уже существует', HttpStatus.BAD_REQUEST)
        }

        const productCategory = categories.find(x => x.name === createProductDto.category)
        if (!productCategory) {
            throw new HttpException('Такой категории товаров не существует', HttpStatus.BAD_REQUEST)
        }

        if (imageFiles.length > 5) {
            throw new HttpException('Не больше 5 прикрепленных файлов', HttpStatus.BAD_REQUEST)
        }

        let fileNames: string[] = []
        for (let image of imageFiles) {
            let fileName = await this.filesService.createFile(image)
            fileNames.push(fileName)
        }
        const newProduct = new this.productModel({ ...createProductDto, imagePaths: fileNames })
        const { productName, manufacturer, releaseYear, price, category, rating, imagePaths, _id, props } = await newProduct.save()
        const product: ResponseProductDto = { _id, productName, manufacturer, releaseYear, price, category, imagePaths, props, rating }
                    
        return product
    }

    async updateProduct(updateProductDto: UpdateProductDto, imageFiles: any): Promise<ResponseProductDto> {
        const { id, ...updateInfo } = updateProductDto
        const productToUpdate: ResponseProductDto = await this.productModel.findById(updateProductDto.id)

        if (imageFiles.length > 5) {
            throw new HttpException('Не больше 5 прикрепленных файлов', HttpStatus.BAD_REQUEST)
        }

        let fileNames: string[] = []
        for (let image of imageFiles) {
            if (!productToUpdate.imagePaths.includes(image.originalname)) {
                let fileName = await this.filesService.createFile(image)
                fileNames.push(fileName)
            } else {
                fileNames.push(image.originalname)
            }
        }

        const updatedProduct = await this.productModel.findByIdAndUpdate(updateProductDto.id, {
            ...updateInfo, 
            imagePaths: fileNames 
        }, { 
            new: true 
        })
        return updatedProduct
    }

    async deleteProduct(productId: string): Promise<DeletedProductDto> {
        const { imagePaths } = await this.productModel.findById(productId)
        let deletedFiles: string[] = []
        for (let imagePath of imagePaths) {
            deletedFiles.push(await this.filesService.deleteFile(imagePath))
        }
        const deletedProduct = await this.productModel.deleteOne({ _id: productId })

        return { deletedFiles, ...deletedProduct }
    }

    async getCategories(): Promise<Category[]> {
        return categories
    }
    
    async getSummaryById(productId: string): Promise<ResponseProductSummaryDto> {
        const { productName, imagePaths, price, rating, _id } = await this.productModel.findById(productId)
        const imagePath: string = imagePaths[0]
        const product: ResponseProductSummaryDto = { _id, productName, price, rating, imagePath }
        if (!product) {
            throw new HttpException('Товар с таким ID не найден', HttpStatus.BAD_REQUEST)
        }

        return product
    }

    async getProductById(productId: string): Promise<ResponseProductDto> {
        try {
            const product: ResponseProductDto = await this.productModel.findById(productId, '-__v')
            return product
        }
        catch {
            throw new HttpException('Товар с таким ID не найден', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllProductsOfCategory(categoryName: string): Promise<ResponseProductIdDto[]> {
        const products: ResponseProductIdDto[] = await this.productModel.find({ category: categoryName }).select({ '_id': 1, 'productName': 1})

        return products
    }

    async getAll(): Promise<ResponseProductIdDto[]> {
        const products: ResponseProductIdDto[] = await this.productModel.find().select({ '_id': 1, 'productName': 1})

        return products
    }

    async addReview(productId: string, reviewRating: string): Promise<ResponseProductDto>  {
        const productToUpdate = await this.productModel.findById(productId)
        productToUpdate.rating[reviewRating] += 1
        await productToUpdate.save()
        return productToUpdate
    }

    async removeReview(productId: string, reviewRating: string): Promise<ResponseProductDto>  {
        const productToUpdate = await this.productModel.findById(productId)
        productToUpdate.rating[reviewRating] -= 1
        await productToUpdate.save()
        return productToUpdate
    }

    async compareProducts(compareProductsDto: CompareProductsDto): Promise<ResponseCompareDto> {
        let category = categories.find((cat) => cat.name === compareProductsDto.category)
        let products: ResponseProductDto[] = []
        for (let id of compareProductsDto.products) {
            let product = await this.productModel.findById(id, '-__v')
            products.push(product)
        }
        return AHP.compare(category, compareProductsDto.crits, products)
    }

}
