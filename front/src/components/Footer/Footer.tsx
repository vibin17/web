import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <div className={styles['container']}>
                <div className={styles['footer__main']}>
                    <div className={styles['footer__section']}>
                        <div className={styles['footer__row']}>
                            <div className={styles['footer__item']}>
                                <div className={styles['footer__text']}>
                                    Служба поддержки
                                </div>
                            </div>
                        </div>
                        <div className={styles['footer__row']}>
                            <div className={styles['footer__item']}>
                                <div className={styles['footer__text']}>
                                    +7 (3512) 99-01-03
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['footer__section']} ${styles['footer__section--right']}`}>
                        <div className={styles['footer__row']}>
                            <div className={styles['footer__item']}>
                                <div className={styles['footer__text']}>
                                    © 2022
                                </div>
                            </div>
                        </div>
                    </div>                   
                    <div className={styles['footer__social-media']}>
                        <div className={`${styles['footer__icon']} ${styles['footer__icon-vk']}`}/>
                        <div className={`${styles['footer__icon']} ${styles['footer__icon-yt']}`}/>
                        <div className={`${styles['footer__icon']} ${styles['footer__icon-tg']}`}/>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer