import React from 'react'
import Button from '../button/Button'
import './modal.css'

const Modal = (props) => {

    const handleClickSecondBtn = () => {
        props.onClickSecondBtn()
    }

    const handleClickPrimaryBtn = () => {
        props.onClickPrimaryBtn()
    }

    const handleClickCancelOrderBtn = () => {
        props.onClickCancelOrderBtn()
    }

    const handleClickPaymentBtn = () => {
        props.onClickPaymentBtn()
    }

    return (
        <div className={`modal ${props.open && 'active'}`}>
            <div className="modal__content" style={{width: `${props.width ? props.width : 80}%`}}>
                <div className="modal__inner">
                    <div className="modal__header">{props.header}</div>
                    <div className="modal__body">{props.children}</div>
                    <div className="modal__footer">
                        <div className="modal__btn"><Button className="button--outline" label={props.labelSecondBtn ? props.labelSecondBtn : 'Hủy'} onClick={handleClickSecondBtn} /></div>
                        {props.onClickCancelOrderBtn && <div className="modal__btn"><Button label='Hủy đơn' onClick={handleClickCancelOrderBtn} /></div>}
                        {props.onClickPaymentBtn && <div className="modal__btn"><Button label='Thanh toán' onClick={handleClickPaymentBtn} /></div>}
                        {props.onClickPrimaryBtn && <div className="modal__btn"><Button label={props.labelPrimaryBtn ? props.labelPrimaryBtn : 'Lưu'} onClick={handleClickPrimaryBtn} /></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal