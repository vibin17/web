import { Body, Controller, Delete, Get, Headers, Post, Query } from '@nestjs/common';
import { CreateReviewDto, DeleteReviewDto } from './dto/request-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) {}

    @Post('/')
    async createReview(@Headers('authorization') authHeader, @Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(authHeader, createReviewDto)
    }

    @Delete('/')
    async deleteReview(@Headers('authorization') authHeader, @Body() deleteReviewDto: DeleteReviewDto) {
        return this.reviewsService.delete(authHeader, deleteReviewDto)
    }

    @Get('/')
    async getReview(@Query('id') reviewId: string) {
        return this.reviewsService.getReview(reviewId)
    }

    @Get('/all')
    async getAllIdsForProduct(@Query('id') productId: string) {
        return this.reviewsService.getAllIdsForProduct(productId)
    }

}
