import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartSlide'
import { remove } from '../redux/product-modal/productModalSlice'
import Toast from '../common/toastify';

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'
import * as CartService from '../services/CartService'

const ProductView = props => {

    const router = useRouter()

    const dispatch = useDispatch()

    // let product = props.product

    const [previewImg, setPreviewImg] = useState(null)

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [color, setColor] = useState(undefined)

    const [size, setSize] = useState(undefined)

    const [quantity, setQuantity] = useState(1)

    const [variantChoose, setVariantChoose] = useState(undefined)

    const [sizes, setSizes] = useState([])
    
    const [colors, setColors] = useState([])

    const [quantityAvailable, setQuantityAvailable] = useState(0)

    const [product, setProduct] = useState({})

    useEffect(() => {
        const { product } = props
        if(product) {
            const productData = {...product}
            const listPrice = productData.variants.map(variant => variant.price)
            if(listPrice.length > 0) {
                productData.minPrice = Math.min(...listPrice)
                productData.maxPrice = Math.max(...listPrice)
            }
            setProduct(productData)
            setSizes(getSizes(productData))
            setColors(getColors(productData))
            setQuantityAvailable(getTotalQuantityAvailable(productData))

            setPreviewImg(productData.image01)
            setQuantity(1)
            setColor(undefined)
            setSize(undefined)
            setVariantChoose(undefined)
        }
    }, [props.product])

    const getTotalQuantityAvailable = (product) => {
        return product.variants.reduce((accumulator, variant) => accumulator += variant.quantity, 0)
    }

    const getColors = (product, size) => {
        if(size) {
            const variantBySize = product.variants.filter(variant => variant.size === size)
            const colorsBySize = variantBySize.map(variant => variant.color)
            return colors.map(color => {
                if(colorsBySize.includes(color.color)) {
                    return {
                        ...color,
                        available: true,
                    }
                }
                else {
                    return {
                        ...color,
                        available: false,
                    }
                }
            })
        }

        return product.variants.reduce((accumulator, variant) => {
            if(accumulator.map(e => e.color).indexOf(variant.color) === -1) {
                accumulator.push({
                    color: variant.color,
                    available: true,
                })
            }
            return accumulator
        }, [])
    }

    const getSizes = (product, color) => {
        if(color) {
            const variantByColor = product.variants.filter(variant => variant.color === color)
            const sizesByColor = variantByColor.map(variant => variant.size)
            return sizes.map(size => {
                if(sizesByColor.includes(size.size)) {
                    return {
                        ...size,
                        available: true,
                    }
                }
                else {
                    return {
                        ...size,
                        available: false,
                    }
                }
            })
        }

        return product.variants.reduce((accumulator, variant) => {
            if(accumulator.map(e => e.size).indexOf(variant.size) === -1) {
                accumulator.push({
                    size: variant.size,
                    available: true,
                })
            }
            return accumulator
        }, [])
    }

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1 > quantityAvailable ? quantityAvailable : quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    const check = () => {
        if (color === undefined) {
            Toast.error('Vui lòng chọn màu sắc!')
            return false
        }

        if (size === undefined) {
            Toast.error('Vui lòng chọn kích cỡ!')
            return false
        }

        return true
    }

    const addToCart = () => {
        if (check()) {
            const newItem = {
                variantId: variantChoose.id,
                quantity: quantity,
            }
            CartService.insert(newItem)
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success('Thêm vào giỏ hàng thành công!')
                    } else {
                        Toast.error('Thêm vào giỏ hàng thất bại!')
                    }
                    // if (dispatch(addItem(newItem))) {
                    //     Toast.success('🦄 Thêm vào giỏ hàng thành công!')
                    // } else {
                    //     Toast.error('🦄 Thêm vào giỏ hàng thất bại!')
                    // }
                })
                .catch(err => Toast.error('🦄 Thêm vào giỏ hàng thất bại!'))
        }
    }

    const goToCart = () => {
        if (check()) {
            const newItem = {
                slug: product.slug,
                color: color,
                size: size,
                price: product.price,
                quantity: quantity,
            }
            if (dispatch(addItem(newItem))) {
                dispatch(remove())
                router.push('/cart')
            } else {
                Toast.error('🦄 Item not found!')
            }
        }
    }

    const getVariant = (color, size) => {
        return product.variants.find(variant => variant.size === size && variant.color === color)
    } 

    const handleChooseVariant = (name, value) => {
        setQuantity(1)
        if(name === 'color') {
            if(value === color) {
                setColor(undefined)
                setVariantChoose(undefined)
                setSizes(getSizes(product))
                setQuantityAvailable(getTotalQuantityAvailable(product))
                return
            }
            setColor(value)
            setSizes(getSizes(product, value))
            if(size) {
                const variant = getVariant(value, size)
                setVariantChoose(variant)
                setQuantityAvailable(variant.quantity)
            }
        }
        if(name === 'size') {
            if(value === size) {
                setSize(undefined)
                setVariantChoose(undefined)
                setColors(getColors(product))
                setQuantityAvailable(getTotalQuantityAvailable(product))
                return
            }
            setSize(value)
            setColors(getColors(product, value))
            if(color) {
                const variant = getVariant(color, value)
                setVariantChoose(variant)
                setQuantityAvailable(variant.quantity)
            }
        }
    }

    const renderPrice = () => {
        if(variantChoose) {
            return numberWithCommas(variantChoose.price)
        } else {
            if(product.minPrice === product.maxPrice) {
                return numberWithCommas(Number(product.minPrice))
            } else {
                return `${product.minPrice && numberWithCommas(Number(product.minPrice))} - ${product.maxPrice && numberWithCommas(Number(product.maxPrice))}`
            }
        }
    }

    return (
        <div className="product-view">
            <div className="product-view__images">
                <div className="product-view__images__list">
                    <div className="product-view__images__list__item" onClick={() => setPreviewImg(product.image01)}>
                        <img src={product.image01} alt="" />
                    </div>
                    <div className="product-view__images__list__item" onClick={() => setPreviewImg(product.image02)}>
                        <img src={product.image02} alt="" />
                    </div>
                </div>
                <div className="product-view__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description}}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product-view__info">
                <h1 className="product-view__info__title">{product.productName}</h1>
                <div className="product-view__info__item">
                    <span className="product-view__info__item__price">
                        {renderPrice()}
                    </span>
                </div>
                <div className="product-view__info__item">
                    <div className="product-view__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product-view__info__item__list">
                        {
                            colors.map((item, index) => {
                                    return item.available ? <div key={index} className={`product-view__info__item__list__item ${color === item.color ? 'active' : ''}`} onClick={() => handleChooseVariant('color', item.color)}>
                                        <div className={`circle bg-${item.color}`}></div>
                                    </div> 
                                    : 
                                    <div key={index} className="product-view__info__item__list__item disable">
                                        <div className={`circle bg-${item.color}`}></div>
                                    </div>
                                }
                            )
                        }
                    </div>
                </div>
                <div className="product-view__info__item">
                    <div className="product-view__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product-view__info__item__list">
                        {
                            sizes.map((item, index) => {
                                return item.available ? <div key={index} className={`product-view__info__item__list__item ${size === item.size ? 'active' : ''}`} onClick={() => handleChooseVariant('size', item.size)}>
                                    <span className="product-view__info__item__list__item__size">
                                        {item.size}
                                    </span>
                                </div> 
                                : 
                                <div key={index} className="product-view__info__item__list__item disable">
                                    <span className="product-view__info__item__list__item__size">
                                        {item.size}
                                    </span>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="product-view__info__item">
                    <div className="product-view__info__item__title">
                        Số lượng
                    </div>
                    <div className="product-view__info__item__quantity">
                        <div className="product-view__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product-view__info__item__quantity__input">
                            {quantity > quantityAvailable ? quantityAvailable : (quantity < 1 ? 1 : quantity)}
                        </div>
                        <div className="product-view__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                    <div className="product-view__info__item__quantity__available">{quantityAvailable} sản phẩm có sẵn</div>
                </div>
                <div className="product-view__info__item">
                    <Button onClick={() => addToCart()}>Thêm vào giỏ</Button>
                    <Button onClick={() => goToCart()}>Mua ngay</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description}}></div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default ProductView
