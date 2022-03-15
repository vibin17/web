import { useEffect, useRef, useState } from 'react';
import HeaderIconButton from './HeaderButton/HeaderIconButton'
import ModalWindow from '../ModalWindow/ModalWindow';
import SignInForm from '../Forms/SignInForm';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RiUserLine } from 'react-icons/ri'
import { BsCart2 } from 'react-icons/bs'
import styles from './Header.module.scss'
import UserMenu from '../UserMenu/UserMenu';

const Header = () => {
  let [isMenuActive, setMenuState] = useState(false)
  let [isSignInFormActive, setSignInFormActive] = useState(false)
  let { userData, signedIn } = useTypedSelector(state => state.auth)
  useEffect(() => {
    setSignInFormActive(false)
  }, [signedIn])
  
  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        
        <div className={`${styles['catalogue-menu']} ${isMenuActive && styles['catalogue-menu--active']}`}/>

        {!signedIn && <ModalWindow isWindowActive={isSignInFormActive} setWindowActive={setSignInFormActive}>
          <SignInForm/>  
        </ModalWindow>
        }

        <div className={`${styles['header__section']} ${styles['shop-section']}`}>
          <div className={styles['burger-menu']} onClick={() => setMenuState(!isMenuActive)}>
            <div className={styles['burger-menu__line']}/>
          </div>
          <div className={styles['header-logo']}>
            logo-placeholder
          </div>
        </div>

        <div className={`${styles['header__section']} ${styles['user-section']}`}>
          <div className={styles['user-section__item']}>
            <div className={styles['user-section__item-summary']}>
              <BsCart2 className={styles['user-section__item-icon']}/>
            </div>
          </div>

          <div className={styles['user-section__item']}>
            <div className={styles['user-section__item-summary']}>
              <RiUserLine className={styles['user-section__item-icon']}/>
            </div>
            <div className={styles['user-section__item-details']}>
              <UserMenu setSignInFormActive={setSignInFormActive}/>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Header;