import { useEffect, useRef, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import SignInForm from './AuthForms/SignInForm';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RiUserLine } from 'react-icons/ri'
import { BsCart2 } from 'react-icons/bs'
import { FiHeart } from "react-icons/fi"
import styles from './Header.module.scss'
import UserMenu from './UserMenu/UserMenu';
import SignUpForm from './AuthForms/SignUpForm';
import { Link } from 'react-router-dom';

const Header = () => {
  let [isMenuActive, setMenuState] = useState(false)
  let [isSignInFormActive, setSignInFormActive] = useState(false)
  let [isSignUpFormActive, setSignUpFormActive] = useState(false)
  let { isSignedIn: signedIn } = useTypedSelector(state => state.auth)
  let shopLocal = useTypedSelector( state => state.shopLocal)
  
  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        
        <div className={`${styles['catalogue-menu']} ${isMenuActive && styles['catalogue-menu--active']}`}/>

        {!signedIn && <ModalWindow isWindowActive={isSignInFormActive} setWindowActive={setSignInFormActive}>
          <SignInForm/>  
        </ModalWindow>}

        {!signedIn && <ModalWindow isWindowActive={isSignUpFormActive} setWindowActive={setSignUpFormActive}>
          <SignUpForm/>  
        </ModalWindow>}

        <div className={`${styles['header__section']} ${styles['shop-section']}`}>
          <div className={styles['header-item']}>
            <div className={`${styles['header-item__summary']} ${styles['header-item__summary--cursor-pointer']}`}>
              <div className={styles['burger-menu']} onClick={() => setMenuState(!isMenuActive)}>
                <div className={styles['burger-menu__line']}/>
                Каталог
              </div>
            </div>
          </div>
          <Link to='/' className={styles['header-logo']}> 
              <div className={styles['header-logo__image']}/>
          </Link>
        </div>

        <div className={`${styles['header__section']} ${styles['user-section']}`}>
          
          <div className={styles['header-item']}>
              <div className={styles['header-item__summary']}>
                <FiHeart className={styles['header-item__icon']}/>
                {shopLocal.favorsCount > 0 && 
                  <div className={styles['header-item__count']}>
                    ({shopLocal.favorsCount})
                  </div>
                }
              </div>
              <div className={styles['header-item__details']}>
                <div className={styles['header-item__description']}>
                  Избранные товары
                </div>
              </div>
          </div>

          <div className={styles['header-item']}>
            <div className={styles['header-item__summary']}>
              <BsCart2 className={styles['header-item__icon']}/>
              {shopLocal.cartCount > 0 && 
                  <div className={styles['header-item__count']}>
                    ({shopLocal.cartCount})
                  </div>
                }
            </div>
            <div className={styles['header-item__details']}>
              <div className={styles['header-item__description']}>
                Корзина
              </div>
            </div>
          </div>

          <div className={styles['header-item']}>
            <div className={styles['header-item__summary']}>
              <RiUserLine className={styles['header-item__icon']}/>
            </div>
            
            <div className={styles['header-item__details']}>
              <UserMenu setSignInFormActive={setSignInFormActive} setSignUpFormActive={setSignUpFormActive}/>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Header;