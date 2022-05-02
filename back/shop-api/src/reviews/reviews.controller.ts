import { Body, Controller, Delete, Get, Headers, Post, Query } from '@nestjs/common';
import { CreateReviewDto } from './dto/request-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) {}

    @Post('/')
    async createReview(@Headers('authorization') authHeader, @Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(authHeader, createReviewDto)
    }

    @Delete('/')
    async deleteReview(@Headers('authorization') authHeader, @Query('product') product: string) {
        return this.reviewsService.delete(authHeader, product)
    }

    @Get('/')
    async getReview(@Query('id') reviewId: string) {
        return this.reviewsService.getReview(reviewId)
    }

    @Get('/all')
    async getAllIdsForProduct(@Headers('authorization') authHeader, @Query('id') productId: string) {
        return this.reviewsService.getAllIdsForProduct(authHeader, productId)
    }

}
