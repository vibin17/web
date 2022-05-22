import { useState } from 'react';
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
import CatalogueMenu from './CatalogueMenu/CatalogueMenu';

const Header = () => {
  let [isMenuActive, setMenuActive] = useState(false)
  let [isSignInFormActive, setSignInFormActive] = useState(false)
  let [isSignUpFormActive, setSignUpFormActive] = useState(false)
  let { isSignedIn, userData } = useTypedSelector(state => state.auth)
  let shopLocal = useTypedSelector( state => state.shopLocal)
  
  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>

        <CatalogueMenu isMenuActive={isMenuActive} setMenuActive={setMenuActive}/>
        
        {!isSignedIn && <ModalWindow isWindowActive={isSignInFormActive} setWindowActive={setSignInFormActive}>
          <SignInForm/>  
        </ModalWindow>}

        {!isSignedIn && <ModalWindow isWindowActive={isSignUpFormActive} setWindowActive={setSignUpFormActive}>
          <SignUpForm/>  
        </ModalWindow>}

        <div className={`${styles['header__section']} ${styles['header__shop-section']}`}>
          <div className={styles['header__item']}>
            <div className={`${styles['header__item-summary']} 
              ${styles['header__item-summary--clickable']}`}
            >
              <div className={styles['burger-menu']} 
                onClick={() => setMenuActive(!isMenuActive)}
              >
                <div className={styles['burger-menu__line']}/>
                Каталог
              </div>
            </div>
          </div>
          <Link to='/' className={styles['header__logo']}> 
              <div className={styles['header__logo-image']}/>
          </Link>
          
        </div>
        <div className={`${styles['header__section']} ${styles['header__search-section']}`}>
          <div className={styles['header__search-bar']}>
            <div className={styles['header__search-bar-input']}>
              Поиск...
            </div>
          </div>
        </div>

        <div className={`${styles['header__section']} ${styles['header__user-section']}`}>
          
          <div className={styles['header__item']}>
              <Link to='/favors' className={`${styles['header__item-summary']}`}>
                <FiHeart className={styles['header__item-icon']}/>
                {
                  shopLocal.favorsCount > 0 &&
                    <div className={`${styles['header__count']} 
                      ${styles['header__count--shifted']}`}
                    >
                      {shopLocal.favorsCount}
                    </div>
                }
              </Link>
              <div className={styles['header__item-details']}>
                <div className={styles['header__item-description']}>
                  Избранные товары
                </div>
              </div>
          </div>

          <div className={styles['header__item']}>
            <Link to='/cart' className={`${styles['header__item-summary']}`}>
              <BsCart2 className={styles['header__item-icon']}/>
              {
                shopLocal.cartPrice > 0 && 
                  <div className={`${styles['header__count']}`}>
                    {shopLocal.cartPrice + ' ₽'}
                  </div>
              }
            </Link>
            <div className={styles['header__item-details']}>
              <div className={styles['header__item-description']}>
                Корзина
              </div>
            </div>
          </div>

          <div className={styles['header__item']}>
            <div className={styles['header__item-summary']}>
              <RiUserLine className={styles['header__item-icon']}/>
              {isSignedIn &&
                <div className={styles['header__user-name']}>
                  {
                    userData.userName
                  }
                </div>
              }
            </div>
            
            <div className={`${styles['header__item-details']}
              ${styles['header__item-details--bigger']}`}>
              <UserMenu setSignInFormActive={setSignInFormActive} 
                setSignUpFormActive={setSignUpFormActive}/>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Header;