import { useState } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './UserMenu.module.scss'

type props = {
    setSignInFormActive: (active: boolean) => void
    setSignUpFormActive: (active: boolean) => void
}

const UserMenu = ({ setSignInFormActive, setSignUpFormActive }: props) => {
    let { userData, isSignedIn: signedIn } = useTypedSelector(state => state.auth)
    let { signOut } = useActions()
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
                    
                    <button className={styles['user-menu__button']} onClick={() => signOut()}>
                        Выйти из аккаунта
                    </button>
                </>
            }
        </div>
    </div>
    )
}

export default UserMenu