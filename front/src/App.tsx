import styles from './App.module.scss'
import Header from './components/Header/Header';
import { useAuthActions, useShopLocalActions } from './hooks/useActions';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPanelPage from './pages/AdminPanel/AdminPanelPage';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import ProductPage from './pages/Product/ProductPage';

function App() {
  let { checkAuth } = useAuthActions()
  let { InitShopLocal } = useShopLocalActions()
  useEffect(() => {
    if (localStorage.getItem('refresh')) {
      checkAuth()
    }
    InitShopLocal()
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
                  <Route path='/admin/*' element={<AdminPanelPage/>}/>
                  <Route path='/products'>
                    <Route path=':id' element={<ProductPage/>}/>
                  </Route>  {/* переделать потом */}
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
