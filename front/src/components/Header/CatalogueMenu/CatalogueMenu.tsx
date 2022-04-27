import styles from './CatalogueMenu.module.scss'

type props = {
    isMenuActive: boolean
    setMenuActive: (value: boolean) => void
}

const CatalogueMenu = ({ isMenuActive, setMenuActive }: props) => {
    return <div className={`${styles['catalogue-menu']} ${isMenuActive && styles['catalogue-menu--active']}`}/>
}

export default CatalogueMenu