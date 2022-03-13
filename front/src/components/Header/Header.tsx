import { useState } from 'react';
import HeaderIconButton from './HeaderButton/HeaderIconButton'
import ModalWindow from '../ModalWindow/ModalWindow';
import LoginForm from '../Forms/LoginForm';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RiUserLine } from 'react-icons/ri'
import { BsCart2 } from 'react-icons/bs'
import './Header.scss'

const Header = () => {
  let [isMenuActive, setMenuState] = useState(false)
  let [isLoginFormActive, setLoginFormActive] = useState(false)
  let { userData, signedIn } = useTypedSelector(state => state.auth)
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
          <HeaderIconButton icon={BsCart2} onClickEvent={() => setLoginFormActive(true)}/>
          <HeaderIconButton icon={RiUserLine} onClickEvent={() => setLoginFormActive(true)}/>

          {/* {signedIn? userData.userName :
            <>
              <HeaderIconButton title='Войти' color='orange' onClickEvent={() => setLoginFormActive(true)}/>
              <HeaderIconButton title='Зарегистрироваться'/>
            </>
          } */}
        </div>

      </div>
    </header>
  );
}

export default Header;