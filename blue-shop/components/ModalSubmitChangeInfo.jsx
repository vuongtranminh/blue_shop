import React from 'react'
import Button from './Button'
import { useRouter } from 'next/router'

const ModalSubmitChangeInfo = (props) => {

    const open = props.open ? props.open : false

    const handleClickBtnSecond = () => {
      props.onClickBtnSecond ? props.onClickBtnSecond() : null
    }

    const handleClickBtnSubmit = () => {
      props.onClickBtnSubmit ? props.onClickBtnSubmit() : null
    }

  return (
    <div className={`modal-submit ${open ? 'active' : ''}`}>
        <div className="modal-submit__content">
            <div className="modal-submit__content__btn">
                <Button size="sm" className="btn--radius btn--disable" onClick={handleClickBtnSecond}>Hủy</Button>
                <Button size="sm" className="btn--radius" onClick={handleClickBtnSubmit}>Lưu</Button>
            </div>
        </div>
    </div>
  )
}

export default ModalSubmitChangeInfo