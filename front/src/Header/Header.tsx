import React, { useState } from 'react';
import './Header.scss'
import Button from '../Button/Button'

const Header = () => {
  let [isMenuActive, setMenuState] = useState(false);
  return (
    <header className="header">
      <div className='header__container'>
      <div className={`menu ${isMenuActive && `menu_active`}`}/>
        <div className='header__container__part shop-info'>
          <div className='burger-menu' onClick={() => setMenuState(!isMenuActive)}>
            <div className='burger-menu__line'/>
          </div>
          placeholder
        </div>
        <div className='header__container__part user-info'>
          <Button title='Войти' color='orange'/>
          <Button title='Зарегистрироваться' color=''/>
        </div>
      </div>
    </header>
  );
}

export default Header;