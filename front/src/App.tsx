import './App.scss'
import Header from './components/Header/Header';
import { useActions } from './hooks/useActions';
import { useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import AdminPanelPage from './pages/AdminPanel/AdminPanelPage';

function App() {
  let { checkAuth } = useActions()
  useEffect(() => {
    if (localStorage.getItem('access')) {
      checkAuth()
    }
  }, [])

  return (
    <BrowserRouter>
      <div className='app'>
      <Header/>
        <Routes>
          <Route path='/admin' element={<AdminPanelPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
