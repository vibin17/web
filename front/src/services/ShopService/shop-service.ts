import { AxiosResponse } from "axios";
import { shopAPI } from "../../http";
import { CategoryResponseDto } from "../response/shop-models";

export default class ShopService {
    static async getCategories(): Promise<AxiosResponse<CategoryResponseDto[]>> {
        return shopAPI.get('products/categories')
    }

}