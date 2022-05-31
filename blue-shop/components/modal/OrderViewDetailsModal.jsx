import React from 'react'
import { StatusOrder } from '../../common/StatusOrder'
import { dateFormat } from '../../utils/dateFormat'
import numberWithCommas from '../../utils/numberWithCommas'
import OrderCard from '../account/OrderCard'
import Button from '../Button'
import CartItem from '../CartItem'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../Modal'

const OrderViewDetailsModal = (props) => {

    const { open, order, isCancelOrder } = props

    const handleCancel = () => {
        props.onOpen(false)
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

    const handleCancelOrder = () => {
        props.onCancelOrder()
    }

    return (
        <Modal open={open} onOpenModal={handleCancel}>
            <ModalHeader>Thông tin đơn hàng</ModalHeader>
            <ModalBody>
                <div className="order-detail">
                    <div className="order-detail__info">
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
                    </div>
                    <div className="order-detail__list">
                        {order.items?.map((item, index) => <CartItem item={item} key={index} />)}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                {(order.status === StatusOrder.ACCEPTING) && isCancelOrder ? (
                    <div className="f jcc">
                        <div className="modal__button pr-20">
                            <Button size='block' className="btn--outline" onClick={handleCancelOrder}>Hủy đơn</Button>
                        </div>
                        <div className="modal__button pl-20">
                            <Button size='block' onClick={handleCancel}>Đóng</Button>
                        </div>
                    </div>
                ) : (
                    <div className="f jcc">
                        <div className="modal__button">
                            <Button size='block' onClick={handleCancel}>Đóng</Button>
                        </div>
                    </div>
                )}
            </ModalFooter>
        </Modal>
    )
}

export default OrderViewDetailsModal