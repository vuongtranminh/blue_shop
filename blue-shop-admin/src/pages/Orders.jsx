import React, { useEffect, useState } from 'react'

import Table from '../components/table/Table'

import Button from '../components/button/Button'
import Modal from '../components/modal/Modal'
import Input from '../components/input/Input'
import Toast from '../common/toastify'
import * as OrderService from "../services/OrderService"
import { dateFormat } from '../utils/dateFormat'
import Badge from '../components/badge/Badge'
import numberWithCommas from '../utils/numberWithCommas'
import { useSelector } from 'react-redux'

const ordersTableHead = [
    '',
    'Thời gian lên đơn',
    'Mã khách hàng',
    'Tổng tiền',
    'Thanh toán',
    'Trạng thái',
    'Hành động',
]

const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const status = (status) => {
    if (status === 0) return { color: 'refund', content: 'Hủy đơn' }
    else if (status === 1) return { color: 'pending', content: 'Chờ xác nhận' }
    else if (status === 2) return { color: 'shipping', content: 'Đang giao hàng' }
    else return { color: 'paid', content: 'Hoàn thành' }
}

const renderHead = (item, index) => <th key={index}>{item}</th>

const Body = (props) => {

    const { item, index } = props

    const handleDetails = () => {
        props.onDetails()
    }

    const statusDisplay = status(item.status)

    return <tr key={index}>
        <td>{item.id}</td>
        <td>{dateFormat(item.createdAt)}</td>
        <td>{item.buyerId}</td>
        <td>{numberWithCommas(Number(item.totalPrice))}</td>
        <td>{item.paymentedAt ? dateFormat(item.paymentedAt) : "Chưa thanh toán"}</td>
        <td><Badge type={orderStatus[statusDisplay.color]} content={statusDisplay.content} /></td>
        <td><div className="table__link" onClick={handleDetails}>Xem chi tiết</div></td>
    </tr>
}

const itemTableHead = [
    '',
    'Tên sản phẩm',
    'Ảnh sản phẩm',
    'Màu sắc',
    'Kích cỡ',
    'Đơn giá',
    'Số lượng',
]

const BodyItem = (props) => {

    const { item, index } = props

    return <tr key={index}>
        <td>{index}</td>
        <td>{item.itemName}</td>
        <td>
            <div className="table__image">
                <img src={item.image} />
            </div>
        </td>
        <td>{item.color}</td>
        <td>{item.size}</td>
        <td>{numberWithCommas(item.price)}</td>
        <td>{item.quantity}</td>
    </tr>
}

const PAGE = 1
const SIZE = 10

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(PAGE)
    const [totalPage, setTotalPage] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCancel, setIsOpenCancel] = useState(false)
    const [order, setOrder] = useState({})

    const [orderIdCancel, setOrderIdCancel] = useState(null)

    const themeReducer = useSelector(state => state.ThemeReducer)
    const userId = themeReducer.userId
    console.log(themeReducer)

    const loadData = (page, size) => {
        OrderService.getAll(page, size)
            .then(res => {
                if (res?.data?.success) {
                    setOrders(res?.data?.data?.content)
                    setTotalPage(res?.data?.data?.meta.totalPage)
                }
            })
    }

    useEffect(() => {
        loadData(page, SIZE)
    }, [])

    const handleSelectPage = (page) => {
        setPage(page)
        loadData(page, SIZE)
    }

    const handleClickSecondBtn = () => {
        setIsOpen(false)
        setOrder({})
    }

    const handleClickPrimaryBtn = () => {
        if(order.status === 1) {
            OrderService.acceptOrder(order.id, userId)
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success("Xác nhận đơn hàng thành công!")
                        loadOrder()
                        loadData(page, SIZE)
                    } else {
                        Toast.error("Xác nhận đơn hàng thất bại!")
                    }

                })
                .catch(err => Toast.error("Xác nhận đơn hàng thất bại!"))
        } else if(order.status === 2) {
            OrderService.deliveryOrder(order.id, userId)
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success("Hoàn thành đơn hàng thành công!")
                        loadOrder()
                        loadData(page, SIZE)
                    } else {
                        if(res?.data?.message === 'Order need paymented') {
                            Toast.error("Đơn hàng cần được thanh toán!")
                        } else {
                            Toast.error("Hoàn thành đơn hàng thất bại!")
                        }
                    }

                })
                .catch(err => Toast.error("Hoàn thành đơn hàng thất bại!"))
        }
    }

    const loadOrder = () => {
        OrderService.getById(order.id, userId)
            .then(res => {
                if(res?.data?.success) {
                    setOrder(res?.data?.data)
                }
            })
    }

    const handleDetails = (order) => {
        setIsOpen(true)
        setOrder(order)
    }

    const labelPrimaryBtn = () => {
        if(order.status === 1) return 'Xác nhận đơn hàng'
        else if(order.status === 2) return 'Hoàn thành đơn hàng'
    }

    const handleClickCancelOrderBtn = () => {
        setOrderIdCancel(order.id)
        setIsOpenCancel(true)
    }

    const handleCancelOrder = () => {
        setOrderIdCancel(null)
        setIsOpenCancel(false)
    }

    const handleAcceptCancelOrder = () => {
        OrderService.cancelOrder(orderIdCancel, userId)
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success("Hủy đơn hàng thành công!")
                        loadOrder()
                        loadData(page, SIZE)
                        setOrderIdCancel(null)
                        setIsOpenCancel(false)
                    } else {
                        setOrderIdCancel(null)
                        setIsOpenCancel(false)
                        Toast.error("Hủy đơn hàng thất bại!")
                    }

                })
                .catch(err => {
                    setOrderIdCancel(null)
                    setIsOpenCancel(false)
                    Toast.error("Hủy đơn hàng thất bại!")
                })
    }

    const handleClickPaymentBtn = () => {
        OrderService.paymentOrder(order.id, userId)
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success("ĐƠn hàng đã thanh toán thành công!")
                        loadOrder()
                        loadData(page, SIZE)
                    } else {
                        Toast.error("ĐƠn hàng thanh toán thất bại!")
                    }

                })
                .catch(err => {
                    Toast.error("ĐƠn hàng thanh toán thất bại!")
                })
    }

    return (
        <div>
            <h2 className="page-header">
                Đơn hàng
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                headData={ordersTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                page={page}
                                totalPage={totalPage}
                                onSelectPage={(page) => handleSelectPage(page)}
                            >
                                {orders.map((order, index) =>
                                    <Body
                                        index={index}
                                        item={order}
                                        onDetails={() => handleDetails(order)}
                                    />
                                )}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal header="Chi tiết đơn hàng"
                open={isOpen}
                onClickSecondBtn={handleClickSecondBtn}
                onClickPrimaryBtn={order.status !== 3 && order.status !== 0 && handleClickPrimaryBtn}
                onClickCancelOrderBtn={order.status === 1 && handleClickCancelOrderBtn}
                onClickPaymentBtn={!order.paymentedAt && order.status !== 3 && order.status !== 0 && handleClickPaymentBtn}
                labelPrimaryBtn={labelPrimaryBtn()}
            >
                <div>
                    <div className="order-card__header">
                        <div className="order-card__id">ORDER ID: {order.id}</div>
                        <div className="order-card__status"><Badge type={orderStatus[status(order.status).color]} content={status(order.status).content} /></div>
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
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Table
                                    headData={itemTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                >
                                    {order.items?.map((item, index) =>
                                        <BodyItem
                                            index={index}
                                            item={item}
                                        />
                                    )}
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal header="Hủy đơn"
                open={isOpenCancel}
                onClickSecondBtn={handleCancelOrder}
                onClickPrimaryBtn={handleAcceptCancelOrder}
                labelPrimaryBtn="Đồng ý"
                width="40"
            >
                <div>Bạn có chắc chắn muốn hủy đơn hàng?</div>
            </Modal>
        </div>
    )
}

export default Orders
