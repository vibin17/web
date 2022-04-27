import { useEffect } from "react"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner"
import styles from './ModalWindow.module.scss'

type props = {
    isWindowActive: boolean
    setWindowActive: (active: boolean) => void
    noCloseButton?: boolean
    children: React.ReactNode
}

const ModalWindow = ({ isWindowActive, setWindowActive, noCloseButton = false, children }: props) => {
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
                        {noCloseButton &&
                            <button className={styles['modal-window__close-button']} onClick={closeWindow}/>
                        }  
                    </div>
                    <div className={styles['modal-window__content']}>
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow