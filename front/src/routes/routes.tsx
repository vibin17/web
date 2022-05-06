import { Route, Routes } from "react-router-dom"
import AdminPanelPage from "../components/pages/AdminPanel/AdminPanelPage"
import CreateProductPage from "../components/pages/AdminPanel/CreateProduct/CreateProductPage"
import DeleteProductPage from "../components/pages/AdminPanel/DeleteProduct/DeleteProductPage"
import UpdateProductPage from "../components/pages/AdminPanel/UpdateProduct/UpdateProductPage"
import CartPage from "../components/pages/Cart/CartPage"
import PurchasePage from "../components/pages/Cart/Purchase/PurchasePage"
import CataloguePage from "../components/pages/Catalogue/CataloguePage"
import ComparePage from "../components/pages/Favors/Compare/ComparePage"
import FavorsPage from "../components/pages/Favors/FavorsPage"
import HomePage from "../components/pages/Home/HomePage"
import OrdersHistoryPage from "../components/pages/OrdersHistory/OrdersHistory"
import ProductPage from "../components/pages/Product/ProductPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/'>
                <Route index element={<HomePage/>}/>
                <Route path='*' element={<h2>Ресурс не найден</h2>}/>
                <Route path='/admin'>
                    <Route index element={<AdminPanelPage/>}/> 
                    <Route path='create' element={<CreateProductPage/>}/>
                    <Route path='update' element={<UpdateProductPage/>}/>
                    <Route path='delete' element={<DeleteProductPage/>}/>
                </Route>
                <Route path='/catalogue'>
                    <Route path=':categoryRoute' element={<CataloguePage/>}/>
                </Route>
                <Route path='/products'>
                    <Route path=':id' element={<ProductPage/>}/>
                </Route>  {/* переделать потом */}
                <Route path='/favors'>
                    <Route index element={<FavorsPage/>}/> 
                    <Route path='compare/:category' element={<ComparePage/>}/>
                </Route>
                <Route path='/cart'>
                    <Route index element={<CartPage/>}/> 
                    <Route path='checkout' element={<PurchasePage/>}/>
                </Route>
                <Route path='/orders' element={<OrdersHistoryPage/>}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes