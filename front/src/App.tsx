import styles from './App.module.scss'
import Header from './components/Header/Header';
import { useAuthActions, useShopLocalActions } from './hooks/useActions';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPanelPage from './pages/AdminPanel/AdminPanelPage';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import ProductPage from './pages/Product/ProductPage';
import CartPage from './pages/Cart/CartPage';
import PurchasePage from './pages/Cart/Purchase/PurchasePage';
import CreateProductPage from './pages/AdminPanel/CreateProduct/CreateProductPage';
import UpdateProductPage from './pages/AdminPanel/UpdateProduct/UpdateProductPage';
import DeleteProductPage from './pages/AdminPanel/DeleteProduct/DeleteProductPage';
import OrdersHistoryPage from './pages/OrdersHistory/OrdersHistory';

function App() {
  let { checkAuth } = useAuthActions()
  let { initShopLocal } = useShopLocalActions()
  useEffect(() => {
    if (localStorage.getItem('refresh')) {
      checkAuth()
    }
    initShopLocal()
  }, [])

  return (
    <BrowserRouter>
        <div className={styles['app']}>
          <Header/>
          <main className={styles['main']}>
            <div className={styles['container']}>
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
                  <Route path='/products'>
                    <Route path=':id' element={<ProductPage/>}/>
                  </Route>  {/* переделать потом */}
                  <Route path='/cart'>
                    <Route index element={<CartPage/>}/> 
                    <Route path='checkout' element={<PurchasePage/>}/>
                  </Route>
                  <Route path='/orders' element={<OrdersHistoryPage/>}/>
                </Route>
              </Routes>
            </div>
          </main>
          <Footer/>
        </div>
    </BrowserRouter>
  );
}

export default App;
