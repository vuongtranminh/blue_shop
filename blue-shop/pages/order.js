import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout, { Header, Body } from '../components/Layout';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { checkedAllItems } from '../redux/shopping-cart/cartSlide'
import CartItem from '../components/CartItem'
import Button from '../components/Button'

import productData from '../assets/fake-data/products'
import numberWithCommas from '../utils/numberWithCommas'
import CheckBox from '../components/CheckBox'
import AddressCard from '../components/account/AddressCard'
import Input from '../components/Input'

import 'swiper/css';

const Order = () => {

    const [swiper, setSwiper] = useState(null);

    const handleSlideTo = (index) => {
        swiper.slideTo(index);
    }

    const router = useRouter();

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    const cartItems = cart.cartItems

    const cartItemsChecked = cart.cartItemsChecked

    const [cartProducts, setCartProducts] = useState([])

    const [cartProductsChecked, setCartProductsChecked] = useState([])

    // const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems))
        // setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])

    useEffect(() => {
        setCartProductsChecked(productData.getCartItemsInfo(cartItemsChecked))
        setTotalPrice(cartItemsChecked.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
    }, [cartItemsChecked])

    const goToCategory = () => {
        router.push("/catalog")
    }

    const handleCheckedAllItems = () => {
        dispatch(checkedAllItems())
    }

    return (
        <Helmet title="Order">
            <Layout>
                <Header title='Order' back={true} />
                <Body>
                    <div className="order">
                        <div className="order__tab">
                            <Swiper
                                slidesPerView={'auto'}
                                grabCursor={true}
                                centeredSlidesBounds={true}
                                onSwiper={setSwiper}
                                autoplay={{ delay: 1000 }}
                            >
                                <SwiperSlide onClick={() => handleSlideTo(0)}>
                                    {({ isActive }) => (
                                        <div className={`order__tab__item ${isActive ? 'active' : ''}`}>Chờ xác nhận</div>
                                    )}
                                </SwiperSlide>
                                <SwiperSlide onClick={() => handleSlideTo(1)}>
                                    {({ isActive }) => (
                                        <div className={`order__tab__item ${isActive ? 'active' : ''}`}>Đang giao</div>
                                    )}
                                </SwiperSlide>
                                <SwiperSlide onClick={() => handleSlideTo(2)}>
                                    {({ isActive }) => (
                                        <div className={`order__tab__item ${isActive ? 'active' : ''}`}>Đã giao</div>
                                    )}
                                </SwiperSlide>
                                <SwiperSlide onClick={() => handleSlideTo(3)}>
                                    {({ isActive }) => (
                                        <div className={`order__tab__item ${isActive ? 'active' : ''}`}>Hủy đơn</div>
                                    )}
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="order__list">
                            {
                                cartProducts.map((item, index) => (
                                    <CartItem item={item} key={index} checked={cartProductsChecked.some(e => e.slug === item.slug && e.color === item.color && e.size === item.size)} />
                                ))
                            }
                        </div>
                    </div>
                </Body>
            </Layout>
        </Helmet>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'header']),
    },
})

export default Order