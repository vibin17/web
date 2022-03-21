import { Link, Route, Routes } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './AdminPanelPage.module.scss'

const AdminPanelPage = () => {
    let { userData, isSignedIn } = useTypedSelector(state => state.auth)
    if (userData.roles?.includes('ADMIN') && isSignedIn) {
        return ( 
        <div className={styles['admin-panel']}>
            <Routes>
                <Route path='/' element={                
                    <ul className={styles.list}>
                        <li>
                            <Link to='create' className={styles['link']}>Добавить товар в каталог</Link>
                            <Link to='1' className={styles['link']}>Добавить товар в каталог</Link>
                        </li>
                    </ul>}
                />
                <Route path='create' element={
                    <h2> 213</h2>
                }/>
                    
            </Routes>
        </div>
        )
    }
    else return (
        <div>
            Нет доступа
        </div>
    )
}

export default AdminPanelPage