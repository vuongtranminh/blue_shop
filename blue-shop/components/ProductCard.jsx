import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'

import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'

const ProductCard = props => {

    const [item, setItem] = useState({})

    useEffect(() => {
        const { item } = props
        if(item) {
            const itemData = {...item}
            const listPrice = itemData.variants.map(variant => variant.price)
            if(listPrice.length > 0) {
                itemData.minPrice = Math.min(...listPrice)
                itemData.maxPrice = Math.max(...listPrice)
            }
            setItem(itemData)
        }
    }, [props.item])

    const dispatch = useDispatch()

    const router = useRouter()

    const goToProductDetail = () => {
        router.push(`/product?id=${item.id}`)
    }

    const renderPrice = () => {
        if(item.minPrice === item.maxPrice) {
            return numberWithCommas(Number(item.minPrice))
        } else {
            return `${item.minPrice && numberWithCommas(Number(item.minPrice))} - ${item.maxPrice && numberWithCommas(Number(item.maxPrice))}`
        }
    }

    return (
        <div className="product-card">
            <div className="c-pointer" onClick={goToProductDetail}>
                <div className="product-card__image">
                    <img src={item.image01} alt="" />
                    <img src={item.image02} alt="" />
                </div>
                <h3 className="product-card__name">{item.productName}</h3>
                <div className="product-card__price">
                    {renderPrice()}
                    {/* <span className="product-card__price__old">
                        <del>{numberWithCommas(399000)}</del>
                    </span> */}
                </div>
            </div>
            <div className="product-card__btn">
                <Button
                    size="sm"
                    icon="bx bx-cart"
                    animate={true}
                    onClick={() => dispatch(set(item))}
                >
                    chọn mua
                </Button>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default ProductCard
