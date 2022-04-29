import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { lastValueFrom, timeout } from 'rxjs';
import { ProductsService } from 'src/products/products.service';
import { CreateReviewDto, DeleteReviewDto, UserInfoDto } from './dto/request-review.dto';
import { DeletedReviewDto, ResponseReviewDto } from './dto/response-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
    constructor(@Inject('AUTH_CLIENT') private readonly client: ClientProxy,
                @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
                private productService: ProductsService) {}

    async create(authHeader: string, createReviewDto: CreateReviewDto): Promise<ResponseReviewDto> {
        const token = authHeader.split(' ')[1]
        let response = await (lastValueFrom<UserInfoDto>(this.client.send({
            role: 'users',
            cmd: 'get'
        }, {
            access: token
        }).pipe(timeout(2000)))).catch(error => { 
            throw new HttpException('Авторизация не пройдена', HttpStatus.UNAUTHORIZED)
        })

        let productInDb = await this.productService.getProductById(createReviewDto.product)
        if (!productInDb) {
            throw new HttpException('Товар с таким ID не найден', HttpStatus.BAD_REQUEST)
        }
        
        let existingReview = await this.reviewModel.find({ 
            user: response.userId,
            product: createReviewDto.product 
        })
        if (existingReview.length > 0) {
            throw new HttpException('Пользователем уже написан отзыв на этот товар', HttpStatus.BAD_REQUEST)
        }

        let rates = ['1', '2', '3', '4', '5']
        let rate = rates[createReviewDto.rating - 1]

        let {
            _id,
            user,
            userName,
            product,
            rating,
            reviewDate,
            content
        } = await new this.reviewModel({
            user: response.userId,
            userName: response.userName,
            product: createReviewDto.product,
            rating: createReviewDto.rating,
            reviewDate: createReviewDto.reviewDate,
            content: createReviewDto.content
        }).save()

        this.productService.addReview(product, rate)

        let review: ResponseReviewDto = {
            _id,
            user,
            userName, 
            product,
            rating,
            reviewDate,
            content
        }

        return review
    }

    async delete(authHeader: string, deleteReviewDto: DeleteReviewDto): Promise<DeletedReviewDto> {
        const token = authHeader.split(' ')[1]
        let response = await (lastValueFrom<UserInfoDto>(this.client.send({
            role: 'users',
            cmd: 'get'
        }, {
            access: token
        }).pipe(timeout(2000)))).catch(error => { 
            throw new HttpException('Авторизация не пройдена', HttpStatus.UNAUTHORIZED)
        })

        const deletedReview = await this.reviewModel.deleteOne({ user: response.userId, product: deleteReviewDto.product })

        return deletedReview
    }

    async getReview(reviewId: string): Promise<ResponseReviewDto> {
        let review = await this.reviewModel.findById(reviewId).select('-__v')

        return review
    }

    async getAllIdsForProduct(productId: string): Promise<ResponseReviewDto[]> {
        let reviewIds = await this.reviewModel.find({ product: productId }).select({ '_id': 1 })

        return reviewIds
    }
}
