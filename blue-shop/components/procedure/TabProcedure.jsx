import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import productData from '../../assets/fake-data/products'
import { PROCEDURE } from '../../common/procedure'

const tabList = [
    {
        title: 'Chờ xác nhận',
        icon: '/svgs/printer.svg',
    },
    {
        title: 'Chờ lấy hàng',
        icon: '/svgs/store.svg',
    },
    {
        title: 'Đang giao',
        icon: '/svgs/car.svg',
    },
    {
        title: 'Đã giao',
        icon: '/svgs/check.svg',
    },
]

const TabProcedure = (props) => {

    const cart = useSelector((state) => state.cart)
    const cartItems = cart.cartItems
    const [cartProducts, setCartProducts] = useState({
        title: '',
        listCartProducts: [],
    })

    const [index, setIndex] = useState(0)

    useEffect(() => {
        loadData()
    }, [index])

    const loadData = () => {
        if(index === PROCEDURE.WAIT_FOR_CONFIRMATION) {
            // call API here
            setCartProducts({
                title: tabList[index].title,
                listCartProducts: productData.getCartItemsInfo(cartItems),
            })
        } else if (index === PROCEDURE.WAIT_FOR_CONFIRMATION) {
            // call API here
            setCartProducts({
                title: tabList[index].title,
                listCartProducts: productData.getCartItemsInfo(cartItems),
            })
        } else if (index === PROCEDURE.DELIVERING) {
            // call API here
            setCartProducts({
                title: tabList[index].title,
                listCartProducts: productData.getCartItemsInfo(cartItems),
            })
        } else {
            // call API here
            setCartProducts({
                title: tabList[index].title,
                listCartProducts: productData.getCartItemsInfo(cartItems),
            })
        }
     }

     const handleChangeTab = (index) => {
        setIndex(index)
     }

    return (
        <div className="tab">
            <div className="procedure__title">
                {tabList.map((tab, index) => {
                    if (index >= 0 && index < tabList.length - 1) {
                        return (
                            <>
                                <Tab key={index} tab={tab} onClick={() => handleChangeTab(index)} />
                                <div className="procedure__title__line"></div>
                            </>
                        )
                    } else {
                        return <Tab key={index} tab={tab} />
                    }
                })}
            </div>
            <TabContent listItem={cartProducts.listCartProducts} title={cartProducts.title} />
        </div>
    )
}

export const Tab = (props) => {

    return (
        <div className="procedure__title__item">
            <div className="procedure__title__item__icon">
                <img src={props.tab.icon} />
                {/* <span>10</span> */}
            </div>
            <div className="procedure__title__item__title">
                {props.tab.title}
            </div>
        </div>
    )
}

export const TabContent = props => {

    return (
        <div className="procedure__content">
            <div className="procedure__content__title">{props.title}</div>
            <div className="procedure__content__list">
                {props.listItem.map((item, index) => {
                    return (
                        <div key={index} className="cart__item">
                            <div className="cart__item__image">
                                <img src="/images/products/product-01 (1).jpg" alt="" />
                            </div>
                            <div className="cart__item__info">
                                <div className="cart__item__info__name">
                                    Áo thun Polo 06 - black - s
                                </div>
                                <div className="cart__item__info__price">
                                    194,000
                                </div>
                                <div className="cart__item__info__quantity">
                                    <div className="product__info__item__quantity">
                                        <div className="product__info__item__quantity__input">
                                            20
                                        </div>
                                    </div>
                                </div>
                                <div className="cart__item__del">
                                    Hủy đơn
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TabProcedure