import styles from './App.module.scss'
import Header from './components/Header/Header';
import { useAuthActions, useShopLocalActions } from './hooks/useActions';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPanelPage from './components/pages/AdminPanel/AdminPanelPage';
import Footer from './components/Footer/Footer';
import HomePage from './components/pages/Home/HomePage';
import ProductPage from './components/pages/Product/ProductPage';
import CartPage from './components/pages/Cart/CartPage';
import PurchasePage from './components/pages/Cart/Purchase/PurchasePage';
import CreateProductPage from './components/pages/AdminPanel/CreateProduct/CreateProductPage';
import UpdateProductPage from './components/pages/AdminPanel/UpdateProduct/UpdateProductPage';
import DeleteProductPage from './components/pages/AdminPanel/DeleteProduct/DeleteProductPage';
import OrdersHistoryPage from './components/pages/OrdersHistory/OrdersHistory';
import AppRoutes from './routes/routes';

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
            <AppRoutes/>
          </div>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>

  );
}

export default App;
