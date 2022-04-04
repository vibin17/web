import { Link, Route, Routes } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './AdminPanelPage.module.scss'
import CreateProductPage from './CreateProduct/CreateProductPage'
import DeleteProductPage from './DeleteProduct/DeleteProductPage'
import UpdateProductPage from './UpdateProduct/UpdateProductPage'

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
                            <Link to='update' className={styles['link']}>Изменить каталог</Link>
                        </li>
                        <li className={styles['list__item']}>
                            <Link to='delete' className={styles['link']}>Удалить товар из каталога</Link>
                        </li>
                    </ul>}
                />
                <Route path='create' element={<CreateProductPage/>}/>
                <Route path='update' element={<UpdateProductPage/>}/>
                <Route path='delete' element={<DeleteProductPage/>}/>
                    
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