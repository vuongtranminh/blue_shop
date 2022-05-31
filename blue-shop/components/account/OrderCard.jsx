import React from 'react'
import { StatusOrder } from '../../common/StatusOrder'
import { dateFormat } from '../../utils/dateFormat'
import numberWithCommas from '../../utils/numberWithCommas'

const OrderCard = (props) => {

    const { order } = props

    const handleViewDetails = () => {
        props.onViewDetails()
    }

    const handleCancelOrder = () => {
        props.onCancelOrder()
    }

    const renderStatus = () => {
        if (order.status === StatusOrder.ACCEPTING) {
            return "Chờ xác nhận"
        } else if (order.status === StatusOrder.CANCEL_ORDER) {
            return "Đã hủy"
        } else if (order.status === StatusOrder.DELIVERING) {
            return "Đang giao"
        } else if (order.status === StatusOrder.DELIVERED) {
            return "Hoàn thành"
        }
    }

    return (
        <div className="order-card">
            <div className="order-card__header">
                <div className="order-card__id">ORDER ID: {order.id}</div>
                <div className="order-card__status">{renderStatus()}</div>
            </div>
            <div className="order-card__body">
                <div className="order-card__info">Tên người nhận: <span>{order.buyerName}</span></div>
                <div className="order-card__info">Số điện thoại: <span>{order.phone}</span></div>
                <div className="order-card__info">Tỉnh/Thành Phố: <span>{order.city}</span></div>
                <div className="order-card__info">Quận/Huyện: <span>{order.district}</span></div>
                <div className="order-card__info">Phường/Xã: <span>{order.commune}</span></div>
                <div className="order-card__info">Địa chỉ chi tiết: <span>{order.address}</span></div>
                <div className="order-card__info">Tổng tiền: <span>{numberWithCommas(Number(order.totalPrice))}</span></div>
                <div className="order-card__info">Thời gian đặt hàng: <span>{dateFormat(order.createdAt)}</span></div>
                {order.paymentedAt && <div className="order-card__info">Thời gian thanh toán: <span>{dateFormat(order.paymentedAt)}</span></div>}
                {order.deliveredAt && <div className="order-card__info">Thời gian hoàn thành: <span>{dateFormat(order.deliveredAt)}</span></div>}
            </div>
            <div className="order-card__footer">
                <div className={`order-card__button ${(order.status === StatusOrder.ACCEPTING) && 'mh-10'}`} onClick={handleViewDetails}>Xem chi tiết</div>
                {(order.status === StatusOrder.ACCEPTING) && <div className="order-card__button order-card__button--danger mh-10" onClick={handleCancelOrder}>Hủy đơn</div>}
            </div>
        </div>
    )
}

export default OrderCard