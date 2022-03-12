import { ReactElement, useState } from "react"
import './ModalWindow.scss'

type props = {
    isWindowActive: boolean
    setWindowActive: (active: boolean) => void
    children: React.ReactNode
}

const ModalWindow = ({ isWindowActive, setWindowActive, children }: props) => {
    const closeWindow = () => setWindowActive(false)
    return (
        <div className={isWindowActive? 'modal-back active' : 'modal-back'} onClick={closeWindow}>
            <div className='modal-container'>
                <div className='modal-window' onClick={(event) => event.stopPropagation()}>
                    <div className='modal-window__header'>
                        <button className='modal-window__header__close-button' onClick={closeWindow}/>    
                    </div>
                    <div className='modal-window__main'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow