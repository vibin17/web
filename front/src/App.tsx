import './App.scss'
import Header from './components/Header/Header';
import { useActions } from './hooks/useActions';
import { useEffect } from 'react';

function App() {
  let { checkAuth } = useActions()
  useEffect(() => {
    if (localStorage.getItem('access')) {
      checkAuth()
    }
  }, [])

  return (
    <div className='app'>
      <Header/>
    </div>
  );
}

export default App;
