import { KeyboardEventHandler, ReactElement, useEffect, useState } from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner"
import styles from './ModalWindow.module.scss'

type props = {
    isWindowActive: boolean
    setWindowActive: (active: boolean) => void
    children: React.ReactNode
}

const ModalWindow = ({ isWindowActive, setWindowActive, children }: props) => {
    const closeWindow = () => setWindowActive(false)
    const handleEscapePress =  (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeWindow()
        }
    }
    let isLoading = useTypedSelector(state => state.auth.isLoading)
    useEffect(() => {
        isWindowActive?
            document.addEventListener('keyup', handleEscapePress)
            :
            document.removeEventListener('keyup', handleEscapePress)
        return () => { document.removeEventListener('keyup', handleEscapePress) }
    }, [isWindowActive])
    return (
        <div className={`${styles['modal-window']} ${isWindowActive && styles['modal-window--active']}`} onClick={closeWindow}>
            <div className={styles['modal-window__container']} onClick={(event) => event.stopPropagation()}>
                <div className={styles['modal-window__main']}>
                    { isLoading && <LoadingSpinner/> }
                    <div className={styles['modal-window__header']}>
                        <button className={styles['modal-window__close-button']} onClick={closeWindow}/>    
                    </div>
                    <div className={styles['modal-window__content']}>
                        {/*isWindowActive &&*/ /*Убрать если что*/ children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow