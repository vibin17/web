import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private productModel: Model<Order>) {}

    async create(createProductDto: CreateProductDto): Promise<ResponseProductDto> {
        const existingProduct: Product = await this.productModel.findOne({ productName: createProductDto.productName })

        if (existingProduct) {
            throw new HttpException('Товар с таким названием уже существует', HttpStatus.BAD_REQUEST)
        }

        const productCategory = categories.find(x => x.name === createProductDto.categoryName)
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
        const newProduct = new this.productModel({ ...createProductDto, category: productCategory, imagePaths: fileNames })
        const { productName, manufacturer, releaseYear, price, category, rating, imagePaths, _id, props } = await newProduct.save()
        const product: ResponseProductDto = { _id, productName, manufacturer, releaseYear, price, category, imagePaths, props, rating }
                    
        return product
    }

}
