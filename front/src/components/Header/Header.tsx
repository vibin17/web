import React, { useEffect, useState } from 'react';
import './Header.scss'
import HeaderButton from './HeaderButton/HeaderButton'
import ModalWindow from '../ModalWindow/ModalWindow';
import LoginForm from '../Forms/LoginForm';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Header = () => {
  let [isMenuActive, setMenuState] = useState(false)
  let [isLoginFormActive, setLoginFormActive] = useState(false)
  let { userData, signedIn } = useTypedSelector(state => state.auth)
  useEffect(() => {
    
  })
  return (
    <header className="header">
      <div className='header__container'>
        
        <div className={`menu ${isMenuActive && `menu_active`}`}/>

        {!signedIn && <ModalWindow isWindowActive={isLoginFormActive} setWindowActive={setLoginFormActive}>
          <LoginForm/>  
        </ModalWindow>
        }

        <div className='header__container__part shop-info'>
          <div className='burger-menu' onClick={() => setMenuState(!isMenuActive)}>
            <div className='burger-menu__line'/>
          </div>
          logo-placeholder
        </div>

        <div className='header__container__part user-info'>
          {userData.userName}
          <HeaderButton title='Войти' color='orange' onClickEvent={() => setLoginFormActive(true)}/>
          <HeaderButton title='Зарегистрироваться'/>
        </div>

      </div>
    </header>
  );
}

export default Header;