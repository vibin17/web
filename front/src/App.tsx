import styles from './App.module.scss'
import Header from './components/Header/Header';
import { useAuthActions, useShopLocalActions } from './hooks/useActions';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
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
