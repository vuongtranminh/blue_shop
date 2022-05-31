import React, { useCallback, useState, useEffect, useRef } from 'react'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import productData from '../assets/fake-data/products'
import category from '../assets/fake-data/category'
import colors from '../assets/fake-data/product-color'
import size from '../assets/fake-data/product-size'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout, { Body, Footer, Header } from '../components/Layout'
import * as ProductService from '../services/ProductService'
import { useRouter } from 'next/router'
import { getParams } from '../utils/query'

const PAGE = 1
const SIZE = 8

const Catalog = () => {

    const router = useRouter()

    const initFilter = {
        category: [],
        color: [],
        size: []
    }

    const [productsData, setProductsData] = useState([])

    const [productsFilter, setProductsFilter] = useState([])

    const [filter, setFilter] = useState(initFilter)

    const [params, setParams] = useState(null)

    const [page, setPage] = useState(PAGE)

    useEffect(() => {
        const params = getParams(router.asPath)
        setParams(params)
        loadData(params)
    }, [])

    const loadData = (params) => {
        if(params) {
            ProductService.getProductsByCategoryId(params.id, page, SIZE)
                .then(res => {
                    if(res?.data?.success) {
                        const data = res.data.data
                        const productList = data?.content
                        setProductsData(productList)
                        setProductsFilter(productList)
                    }
                })
        } else {
            ProductService.getAll(page, SIZE)
            .then(res => {
                if(res?.data?.success) {
                    const data = res.data.data
                    const productList = data?.content
                    setProductsData(productList)
                    setProductsFilter(productList)
                }
            })
        }
    } 

    const handleLoadMore = () => {
        const pageTemp = page + 1
        setPage(pageTemp)
        if(params) {
            ProductService.getProductsByCategoryId(params.id, pageTemp, SIZE)
                .then(res => {
                    if(res?.data?.success) {
                        const data = res.data.data
                        const productList = [...productsData, ...data?.content]
                        setProductsData(productList)
                        setProductsFilter(productList)
                    }
                })
        } else {
            ProductService.getAll(pageTemp, SIZE)
            .then(res => {
                if(res?.data?.success) {
                    const data = res.data.data
                    const productList = [...productsData, ...data?.content]
                    setProductsData(productList)
                    setProductsFilter(productList)
                }
            })
        }
    }

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "CATEGORY":
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] })
                    break
                case "COLOR":
                    setFilter({ ...filter, color: [...filter.color, item.color] })
                    break
                case "SIZE":
                    setFilter({ ...filter, size: [...filter.size, item.size] })
                    break
                default:
            }
        } else {
            switch (type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({ ...filter, category: newCategory })
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({ ...filter, color: newColor })
                    break
                case "SIZE":
                    const newSize = filter.size.filter(e => e !== item.size)
                    setFilter({ ...filter, size: newSize })
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = productsData

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.categorySlug))
            }

            if (filter.color.length > 0) {
                temp = temp.filter(e => {
                    const check = e.colors.find(color => filter.color.includes(color))
                    return check !== undefined
                })
            }

            if (filter.size.length > 0) {
                temp = temp.filter(e => {
                    const check = e.size.find(size => filter.size.includes(size))
                    return check !== undefined
                })
            }

            setProductsFilter(temp)
        },
        [filter, productsData],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    return (
        <Helmet title="Sản phẩm">
            <Layout>
                <Header title="Catalog" />
                <Body>
                    <div className="catalog">
                        <div className="catalog__filter" ref={filterRef} style={{display: 'none'}}>
                            <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                                <i className="bx bx-left-arrow-alt"></i>
                            </div>
                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">
                                    danh mục sản phẩm
                                </div>
                                <div className="catalog__filter__widget__content">
                                    {
                                        category.map((item, index) => (
                                            <div key={index} className="catalog__filter__widget__content__item">
                                                <CheckBox
                                                    label={item.display}
                                                    onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                                    checked={filter.category.includes(item.categorySlug)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">
                                    màu sắc
                                </div>
                                <div className="catalog__filter__widget__content">
                                    {
                                        colors.map((item, index) => (
                                            <div key={index} className="catalog__filter__widget__content__item">
                                                <CheckBox
                                                    label={item.display}
                                                    onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                                    checked={filter.color.includes(item.color)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__title">
                                    kích cỡ
                                </div>
                                <div className="catalog__filter__widget__content">
                                    {
                                        size.map((item, index) => (
                                            <div key={index} className="catalog__filter__widget__content__item">
                                                <CheckBox
                                                    label={item.display}
                                                    onChange={(input) => filterSelect("SIZE", input.checked, item)}
                                                    checked={filter.size.includes(item.size)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__content">
                                    <Button size="sm" onClick={clearFilter}>Xóa bộ lọc</Button>
                                </div>
                            </div>
                        </div>
                        <div className="catalog__filter__toggle">
                            <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                        </div>
                        <div className="catalog__content">
                            <InfinityList
                                data={productsFilter}
                            />
                        </div>
                    </div>
                </Body>
                <Footer>
                    <div className="f jcc">
                        <Button onClick={handleLoadMore}>Load more</Button>
                    </div>
                </Footer>
            </Layout>
        </Helmet>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'header']),
    },
})

export default Catalog
