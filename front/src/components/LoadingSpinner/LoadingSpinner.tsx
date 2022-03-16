import styles from './LoadingSpinner.module.scss'

type props = {
    isLoadingActive: boolean
    setLoadingActive: (active: boolean) => void
}

const LoadingSpinner = () => {
    return (
        <div className={styles['loading']}>
            <div className={styles['loading__spinner']}/>
        </div>
    )
}

export default LoadingSpinner