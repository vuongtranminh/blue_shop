import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { addItem, checkedAllItems, removeCheckedAllItems } from '../redux/shopping-cart/cartSlide'
import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'

import productData from '../assets/fake-data/products'
import numberWithCommas from '../utils/numberWithCommas'
import CheckBox from '../components/CheckBox'
import Layout, { Body, Header } from '../components/Layout'
import Toast from '../common/toastify';
import { updateItem, removeItem, checkedItem } from '../redux/shopping-cart/cartSlide'

import * as CartService from "../services/CartService"

const Cart = () => {

    const router = useRouter();

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    const userId = useSelector((state) => state.account.userId)

    const [cartItems, setCartItems] = useState(cart.cartItems)

    const [cartProducts, setCartProducts] = useState([])

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        loadData(cartItems)
    }, [])

    const loadData = (cartItems) => {
        CartService.getCart()
            .then(res => {
                if(res?.data?.success) {
                    const cartProducts = getCartProductsHasChecked(res.data.data)
                    setCartProducts(cartProducts)
                    setTotalPrice(getTotalPrice(cartItems))
                }
            })
    }

    useEffect(() => {
        const cartProductsUpdate = getCartProductsHasChecked(cartProducts)
        setCartProducts(cartProductsUpdate)
        setTotalPrice(getTotalPrice(cartItems))
    }, [cartItems.length])

    //get item cart checked
    const getCartProductsHasChecked = (cartProducts) => {
        const listIdCartItems = cartItems.map(item => item.id)
        if(cartItems.length > 0) {
            return cartProducts.map(item => {
                if(listIdCartItems.includes(item.id)) {
                    return {
                        ...item,
                        checked: true,
                    }
                } else {
                    return {
                        ...item,
                        checked: false,
                    }
                }
            })
        }
        return cartProducts.map(item => {
            return {
                ...item,
                checked: false,
            }
        })
    }

    const getTotalPrice = (cartItems) => {
        return cartItems.reduce((total, item) => total += item.price * item.quantity, 0)
    }

    const checkedItem = (item) => {
        let cartItemsUpdate
        if(item.checked) {
            dispatch(removeItem(item.id))
            cartItemsUpdate = cartItems.filter(e => e.id !== item.id)
        } else {
            dispatch(addItem(item))
            cartItemsUpdate = [...cartItems, item]
            
        }
        setCartItems(cartItemsUpdate)
    }

    const updateItemCart = (itemCart) => {
        CartService.updateById(itemCart.id, userId, itemCart)
            .then(res => {
                if(res?.data?.success) {
                    dispatch(updateItem(itemCart))
                    const cartItemsUpdate = updateQuantityItemCarts(itemCart)
                    loadData(cartItemsUpdate)
                    setCartItems(cartItemsUpdate)
                    Toast.success('Cập nhật số lượng thành công!')
                } else {
                    Toast.error('Cập nhật số lượng thất bại!')
                }
            })
            .catch(err => Toast.error('Cập nhật số lượng thất bại!'))
    }

    const updateQuantityItemCarts = (itemCart) => {
        const cartItemsUpdate = cartItems.filter(e => e.id !== itemCart.id)
        return [...cartItemsUpdate, itemCart]
    }

    const deleteItemCart = (id) => {
        CartService.deleteById(id, userId)
            .then(res => {
                if(res?.data?.success) {
                    dispatch(removeItem(id))
                    const cartItemsUpdate = cartItems.filter(e => e.id !== id)
                    loadData(cartItemsUpdate)
                    setCartItems(cartItemsUpdate)
                    Toast.success('Xóa khỏi giỏ hàng thành công!')
                } else {
                    Toast.error('Xóa khỏi giỏ hàng thất bại!')
                }
            })
            .catch(err => Toast.error('Xóa khỏi giỏ hàng thất bại!'))
    }

    const goToCategory = () => {
        router.push('/catalog')
    }

    const handleCheckedAllItems = () => {
        if(cartItems.length === cartProducts.length) {
            dispatch(removeCheckedAllItems())
            setCartItems([])
        } else {
            dispatch(checkedAllItems(cartProducts))
            setCartItems(cartProducts)
        }
    }

    const goToCheckout = () => {
        router.push('/checkout')
    }

    return (
        <Helmet title="Giỏ hàng">
            <Layout>
                <Header title="Giỏ hàng" back={true} />
                <Body>
                    <div className="cart">

                        <div className="cart__box-info">
                            <div className="cart__info">
                                <div className="cart__info__txt">
                                    <CheckBox
                                        label="Chọn tất cả"
                                        onChange={handleCheckedAllItems}
                                        checked={cartItems.length === cartProducts.length}
                                    />
                                    <div className="cart__info__txt__price">
                                        <span className="mr-10">Thành tiền:</span> <span className="text-gradient">{numberWithCommas(Number(totalPrice))}</span>
                                    </div>
                                </div>
                                <div className="cart__info__btn">
                                    <Button size="block" onClick={goToCheckout}>
                                        Mua hàng
                                    </Button>
                                    <Button size="block" className="mt-20" onClick={goToCategory}>
                                        Tiếp tục xem sản phẩm
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="cart__list">
                            {
                                cartProducts.map((item, index) => (
                                    <CartItem item={item} key={index} type='cart' 
                                        updateItemCart={(itemCart) => updateItemCart(itemCart)} 
                                        deleteItemCart={(id) => deleteItemCart(id)} 
                                        checkedItem={(itemCart) => checkedItem(itemCart)} />
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

export default Cart
