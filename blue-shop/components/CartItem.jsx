import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { updateItem, removeItem, checkedItem } from '../redux/shopping-cart/cartSlide'

import numberWithCommas from '../utils/numberWithCommas'
import Link from 'next/link'
import CheckBox from './CheckBox'

const CartItem = props => {

    const dispatch = useDispatch()

    const [item, setItem] = useState(props.item)
    const [quantity, setQuantity] = useState(props.item.quantity)

    useEffect(() => {
        setItem(props.item)
        setQuantity(props.item.quantity)
    }, [props.item])

    const updateQuantity = (opt) => {
        let quantityUpdate
        if (opt === '+') {
            quantityUpdate = quantity + 1
            if(quantityUpdate > item.quantityAvailable) {
                return
            }
        }
        if (opt === '-') {
            quantityUpdate = quantity - 1
            if(quantityUpdate < 1) {
                return
            }
        }

        const itemCart = {
            ...item,
            quantity: quantityUpdate,
        }
        props.updateItemCart(itemCart)
    }

    const removeCartItem = () => {
        props.deleteItemCart(item.id)
    }

    const handleCheckedItem = () => {
        props.checkedItem(item)
    }

    return (
        <div className="cart__item">
            {props.type === 'cart' && (
                <div className="cart__item__checked">
                    <CheckBox
                        label=""
                        onChange={handleCheckedItem}
                        checked={item.checked}
                    />
                </div>
            )}
            <div className="cart__item__image">
                <img src={item.image} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__group">
                    <div className="cart__item__name">
                        <Link href={`/product?id=${item.productId}`}>
                            {item.itemName}
                        </Link>
                    </div>
                    <div className="cart__item__properties">
                        <div className="cart__item__color">Color: <span className="cart__item__color--bold">{item.color}</span></div>
                        <div className="cart__item__size">Size: <span className="cart__item__size--bold">{item.size}</span></div>
                    </div>
                </div>
                <div className="cart__item__price">
                    {numberWithCommas(item.price)}
                </div>
            </div>
            <div className="cart__item__quantity">
                {props.type === 'cart' ? (
                    <>
                        <div className="product-view__info__item__quantity product-view__info__item__quantity--circle">
                            <div className="product-view__info__item__quantity__btn" onClick={() => updateQuantity('-')}>
                                <img src="/svgs/minus.svg" />
                            </div>
                            <div className="product-view__info__item__quantity__input">
                                {quantity > item.quantityAvailable ? item.quantityAvailable : quantity}
                            </div>
                            <div className="product-view__info__item__quantity__btn" onClick={() => updateQuantity('+')}>
                                <img src="/svgs/plus.svg" />
                            </div>
                        </div>
                        <div className="mt-5">{item.quantityAvailable} sản phẩm có sẵn</div>
                    </>
                    ) : (
                        <span className="fw-600">Số lượng: {quantity}</span>
                    )
                }
                
            </div>
            {props.type === 'cart' && (
                <div className="cart__item__del">
                    <i className='bx bx-trash' onClick={() => removeCartItem()}></i>
                </div>
            )}
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object
}

export default CartItem
