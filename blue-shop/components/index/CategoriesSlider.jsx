import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRouter } from 'next/router'
import * as CategoryService from '../../services/CategoryService'

import 'swiper/css';

const CategoriesSlider = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        CategoryService.getAll()
            .then(res => {
                if(res?.data?.success) {
                    setCategories(res?.data?.data?.content)
                }
            })
    }

    return (
        <div className="categories-slider">
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={15}
                grabCursor={true}
                centeredSlidesBounds={true}
            >
                {
                    categories.map((category, index) => <SwiperSlide key={index}><CategoriesSliderItem category={category} /></SwiperSlide>)
                }
            </Swiper>
        </div>
    )
}

const CategoriesSliderItem = props => {

    const router = useRouter()

    const handleGoToCategory = () => {
        router.push(`/catalog?id=${props.category.id}`)
    }

    return (
        <div className="categories-slider__item" onClick={handleGoToCategory}>
            <div className="categories-slider__item__image">
                <img src={props.category.image} alt="" />
            </div>
            <div className="categories-slider__item__title">
                {props.category.categoryName}
            </div>
        </div>
    )
}

export default CategoriesSlider
