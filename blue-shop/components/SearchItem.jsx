import React from 'react'
import { useRouter } from 'next/router'
import numberWithCommas from '../utils/numberWithCommas'

const SearchItem = (props) => {

    const { item } = props

    const router = useRouter()

    const goToProduct = () => {
        router.push(`/product?id=${item.id}`)
        props.onGoToProduct()
    }

    const price = () => {
        const listPrice = item.variants.map(variant => variant.price)
        let minPrice
        let maxPrice
        if (listPrice.length > 0) {
            minPrice = Math.min(...listPrice)
            maxPrice = Math.max(...listPrice)
        }

        if(minPrice && maxPrice) {
            if(minPrice === maxPrice) return `${numberWithCommas(minPrice)}`
            else return `${numberWithCommas(minPrice)} - ${numberWithCommas(maxPrice)}`
        }
    }

    return (
        <div className="search__item" onClick={goToProduct}>
            <div className="search__item__image">
                <img src={item.image01} alt="" />
            </div>
            <div className="search__item__info">
                <div className="search__item__info__group">
                    <div className="search__item__name">
                        {item.productName}
                    </div>
                </div>
                <div className="search__item__price">{price()}</div>
            </div>
        </div>
    )
}

export default SearchItem