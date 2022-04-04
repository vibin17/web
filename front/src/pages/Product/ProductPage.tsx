import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ProductResponse } from "../../services/models/shop-models"
import ShopService from '../../services/ShopService/shop-service'

const ProductPage = () => {
    const params = useParams()
    let [product, setProduct] = useState<ProductResponse>()
    console.log(params)
    useEffect(() => {
        (async () => {
            setProduct((await ShopService.getProductById(params.id || 'undef')).data)
        })()
    }, [])
    return <div>
        {product &&
            <div>
                {
                    product.productName
                }
            </div>
            
        }
    </div>
}

export default ProductPage