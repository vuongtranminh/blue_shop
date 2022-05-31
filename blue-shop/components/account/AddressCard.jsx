import React from 'react'
import { TypeInfo } from '../../common/TypeInfo'

const AddressCard = (props) => {

    const { address, isCheckoutAddress } = props

    const handleClickEdit = () => {
        props.onEdit()
    }

    const handleClickDelete = () => {
        props.onDelete()
    }

    const handleCheckoutAddress = () => {
        props.onCheckoutAddress()
    }

    return (
        <div className={`address-card ${props.className}`}>
            <div className="address-card__header">
                {address.type === TypeInfo.HOME ? 
                    <div><img src="/svgs/home.svg" />Nhà</div>
                    :
                    <div><img src="/svgs/map.svg" />Cơ quan</div>
                }
                {isCheckoutAddress ? "[Đang chọn]" : <div className="address-card__button" onClick={handleCheckoutAddress}>Chọn làm địa chỉ giao hàng</div>}
            </div>
            <div className="address-card__body">
                <div className="address-card__info">Tên người nhận: <span>{address.name}</span></div>
                <div className="address-card__info">Số điện thoại: <span>{address.phone}</span></div>
                <div className="address-card__info">Tỉnh/Thành Phố: <span>{address.city}</span></div>
                <div className="address-card__info">Quận/Huyện: <span>{address.district}</span></div>
                <div className="address-card__info">Phường/Xã: <span>{address.commune}</span></div>
                <div className="address-card__info">Địa chỉ chi tiết: <span>{address.address}</span></div>
            </div>
            <div className="address-card__footer">
                <div className="address-card__button mh-10" onClick={handleClickEdit}>Sửa</div>
                <div className="address-card__button address-card__button--danger mh-10" onClick={handleClickDelete}>Xóa</div>
            </div>
        </div>
    )
}

export default AddressCard