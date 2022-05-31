import React, { useEffect } from 'react'

const Modal = (props) => {

    const open = props.open ? props.open : false

    const backdropClose = props.backdropClose ? props.backdropClose : false

    useEffect(() => {
        if (backdropClose) {
            document.addEventListener("click", function(e) {
                if(e.target.matches(".modal") && !e.target.closest(".modal__content")) {
                    props.onOpenModal(false)
                }
            }, false)
        }
        return () => {
            document.removeEventListener("click", null)
        }
    }, [])

  return (
    <div className={`modal ${open ? 'active' : ''}`}>
        <div className="modal__content">
            <div className='modal__content__close'><div onClick={() => props.onOpenModal(false)}></div></div>
            <div className='modal__content__inner'>
                {props.children}
            </div>
        </div>
    </div>
  )
}

export const ModalHeader = (props) => {
    return <div className="modal__header">
        {props.children}
    </div>
}

export const ModalBody = (props) => {
    return <div className="modal__body">
        {props.children}
    </div>
}

export const ModalFooter = (props) => {
    return <div className="modal__footer">
        {props.children}
    </div>
}

export default Modal