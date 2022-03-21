import styles from './App.module.scss'
import Header from './components/Header/Header';
import { useActions } from './hooks/useActions';
import { useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import AdminPanelPage from './pages/AdminPanel/AdminPanelPage';
import Footer from './components/Footer/Footer';

function App() {
  let { checkAuth } = useActions()
  useEffect(() => {
    if (localStorage.getItem('refresh')) {
      checkAuth()
    }
  }, [])

  return (
    <BrowserRouter>
        <div className={styles['app']}>
          <Header/>
          <main className={styles['main']}>
            <div className={styles['container']}>
              <Routes>
                <Route path='/'/>
                <Route path='*' element={<h2>Ресурс не найден</h2>}/>
                <Route path='/admin/*' element={<AdminPanelPage/>}/>
              </Routes>
            </div>
          </main>
          <Footer/>
        </div>
    </BrowserRouter>
  );
}

export default App;
