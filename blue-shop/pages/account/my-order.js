import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Toast from '../../common/toastify'
import BoxLayout, { BoxBody } from '../../components/account/BoxLayout'
import OrderCard from '../../components/account/OrderCard'
import Helmet from '../../components/Helmet'
import Layout, { Body, Header } from '../../components/Layout'
import OrderViewDetailsModal from '../../components/modal/OrderViewDetailsModal'
import * as OrderService from '../../services/OrderService'

const PAGE = 1
const SIZE = 10

const MyOrder = () => {

    const [orders, setOrders] = useState([])
    const [isOpenOrderViewDetailsModal, setIsOpenOrderViewDetailsModal] = useState(false)
    const [orderDetails, setOrderDetails] = useState({})
    const [isCancelOrder, setIsCancelOrder] = useState(false)
    
    const userId = useSelector(state => state.account.userId)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        OrderService.getOrdersByUserId(userId, PAGE, SIZE)
            .then(res => {
                if(res?.data?.success) {
                    setOrders(res.data.data?.content)
                }
            })
    }

    const handleViewDetails = order => {
        setIsOpenOrderViewDetailsModal(true)
        setOrderDetails(order)
    }

    const handleOpenOrderViewDetailsModal = (isOpen) => {
        setIsOpenOrderViewDetailsModal(isOpen)
        if(!isOpen) {
            setIsCancelOrder(false)
        }
    }

    const handleViewCancelOrder = order => {
        setIsOpenOrderViewDetailsModal(true)
        setOrderDetails(order)
        setIsCancelOrder(true)
    }

    const handleCancelOrder = () => {
        OrderService.cancelOrder(orderDetails.id, userId)
            .then(res => {
                if(res?.data?.success) {
                    setIsOpenOrderViewDetailsModal(false)
                    setOrderDetails({})
                    setIsCancelOrder(false)
                    loadData()
                    Toast.success("Hủy đơn hàng thành công!")
                } else {
                    Toast.error("Hủy đơn hàng thất bại!")
                }
            })
            .catch(err => Toast.error("Hủy đơn hàng thành công!"))
    }

    return (
        <Helmet title="My Order">
            <Layout>
                <Header title="Đơn hàng" back={true} />
                <Body>
                    <BoxLayout>
                        <BoxBody>
                            {orders.map((order, index) => <OrderCard key={index} order={order} onViewDetails={() => handleViewDetails(order)} onCancelOrder={() => handleViewCancelOrder(order)} />)}
                        </BoxBody>
                    </BoxLayout>
                </Body>
            </Layout>

            <OrderViewDetailsModal 
                open={isOpenOrderViewDetailsModal} 
                onOpen={(isOpen) => handleOpenOrderViewDetailsModal(isOpen)}
                order={orderDetails}
                isCancelOrder={isCancelOrder}
                onCancelOrder={handleCancelOrder}
            />
        </Helmet>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'header']),
    },
})

export default MyOrder