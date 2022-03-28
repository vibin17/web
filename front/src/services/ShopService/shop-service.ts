import { AxiosResponse } from "axios";
import { FileWithPath } from "react-dropzone";
import { shopAPI, SHOP_URL } from "../../http";
import { CategoryResponseDto, CreateProductData, DeletedResponse, ProductIdResponse, ProductResponse } from "../models/shop-models";

export default class ShopService {
    static async getCategories(): Promise<AxiosResponse<CategoryResponseDto[]>> {
        return shopAPI.get('products/categories')
    }

    static async getAllProductsOfCategory(categoryName: string): Promise<AxiosResponse<ProductIdResponse[]>> {
        return shopAPI.get('products/category', { 
            params: {
                category: categoryName
            }
        })
    }

    static async getProductById(productId: string): Promise<AxiosResponse<ProductResponse>> {
        return shopAPI.get('products/', { 
            params: {
                id: productId
            }
        })
    }

    static async getProductImage(fileName: string): Promise<any> {
        return shopAPI.get(`products/images/${fileName}`, {
            responseType: 'blob'
        })
    }
    
    static async createProduct(productData: CreateProductData, images: FileWithPath[]): Promise<AxiosResponse<ProductResponse>> {
        let data = new FormData()
        data.append('productName', productData.productName)
        data.append('manufacturer', productData.manufacturer)
        data.append('releaseYear', productData.releaseYear)
        data.append('categoryName', productData.categoryName)
        data.append('price', productData.price)
        data.append('description', productData.description)
        for (let prop of productData.props) {
            data.append('props[]', prop)
        }
        for (let image of images) {
            data.append('images', image)
        }
        return shopAPI.post('products/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async deleteProduct(productId: string): Promise<AxiosResponse<DeletedResponse>> {
        return shopAPI.delete('products/', { 
            params: {
                id: productId
            }
        })
    }

}