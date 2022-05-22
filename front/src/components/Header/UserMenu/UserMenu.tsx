import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import styles from './UserMenu.module.scss'

type props = {
    setSignInFormActive: (active: boolean) => void
    setSignUpFormActive: (active: boolean) => void
}

const UserMenu = ({ setSignInFormActive, setSignUpFormActive }: props) => {
    let { userData, isSignedIn: signedIn } = useTypedSelector(state => state.auth)
    let { signOut } = useAuthActions()
    return (
    <div className={styles['user-menu']}>
        <div className={styles['user-menu__container']}>
            {!signedIn? 
                <>
                    <button className={styles['user-menu__button']} onClick={() => setSignInFormActive(true)}>
                        Войти в аккаунт
                    </button>
                    <button className={styles['user-menu__button']} onClick={() => setSignUpFormActive(true)}>
                        Регистрация
                    </button>
                </> : <>
                    <div className={styles['user-menu__info']}>
                        {userData.userName} 
                    </div>
                    {userData.roles?.includes('ADMIN') && 
                        <Link to={'/admin'} className={styles['user-menu__button']}>
                            Панель администратора
                        </Link>
                    }
                    <Link to={'/orders'} className={styles['user-menu__button']}>
                        История заказов
                    </Link>
                    <Link to={'/'} className={`${styles['user-menu__button']} ${styles['user-menu__button--red']}`} onClick={() => { signOut() }}>
                        Выйти из аккаунта
                    </Link>
                </>
            }
        </div>
    </div>
    )
}

export default UserMenu