import { Link, Route, Routes } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './AdminPanelPage.module.scss'
import CreateProductPage from './CreateProduct/CreateProductPage'

const AdminPanelPage = () => {
    let { userData, isSignedIn } = useTypedSelector(state => state.auth)
    if (userData.roles?.includes('ADMIN') && isSignedIn) {
        return ( 
        <div className={styles['admin-panel']}>
            <Routes>
                <Route path='/' element={                
                    <ul className={styles['list']}>
                        <li className={styles['list__item']}>
                            <Link to='create' className={styles['link']}>Добавить товар в каталог</Link>
                        </li>
                        <li className={styles['list__item']}>
                            <Link to='1' className={styles['link']}>Добавить товар в каталог</Link>
                        </li>
                    </ul>}
                />
                <Route path='create' element={<CreateProductPage/>}/>
                    
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