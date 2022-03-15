import { ReactElement, useState } from "react"
import styles from './ModalWindow.module.scss'

type props = {
    isWindowActive: boolean
    setWindowActive: (active: boolean) => void
    children: React.ReactNode
}

const ModalWindow = ({ isWindowActive, setWindowActive, children }: props) => {
    const closeWindow = () => setWindowActive(false)
    return (
        <div className={`${styles['modal-window']} ${isWindowActive && styles['modal-window--active']}`} onClick={closeWindow}>
            <div className={styles['modal-window__container']}>
                <div className={styles['modal-window__main']} onClick={(event) => event.stopPropagation()}>
                    <div className={styles['modal-window__header']}>
                        <button className={styles['modal-window__close-button']} onClick={closeWindow}/>    
                    </div>
                    <div className={styles['modal-window__content']}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow