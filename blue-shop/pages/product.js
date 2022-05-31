import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import productData from '../assets/fake-data/products'
import Layout, { Body, Header } from '../components/Layout'
import * as ProductService from '../services/ProductService'

const PAGE = 1
const SIZE = 10

const Product = props => {

    const router = useRouter()

    const [product, setProduct] = useState(null)

    const [relatedProducts, setRelatedProducts] = useState([])

    const id = router.query.id
    
    useEffect(() => {
        if(id) {
            loadData()
        }
    }, [id])

    const loadData = () => {
        ProductService.getById(id)
            .then(res => {
                if(res?.data?.success) {
                    setProduct(res.data.data)
                }
            })
    }

    useEffect(() => {
        ProductService.getAll(PAGE, SIZE)
            .then(res => {
                if(res?.data?.success) {
                    const data = res.data.data
                    const productList = data?.content
                    setRelatedProducts(productList)
                }
            })
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [product])

    return product ? (
        <Helmet title={product.productName}>
            <Layout>
                <Header title={product.productName} back={true} />
                <Body>
                    <Section>
                        <SectionBody>
                            <div className="product">
                                <ProductView product={product} />
                            </div>
                        </SectionBody>
                    </Section>
                    <Section>
                        <SectionTitle>
                            Khám phá thêm
                        </SectionTitle>
                        <SectionBody>
                            <Grid
                                col={2}
                                mdCol={2}
                                xlCol={4}
                                gap={20}
                            >
                                {
                                    relatedProducts && relatedProducts.map((item, index) => (
                                        <ProductCard
                                            key={index}
                                            item={item}
                                        />
                                    ))
                                }
                            </Grid>
                        </SectionBody>
                    </Section>
                </Body>
            </Layout>
        </Helmet>
    ) : null
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'header']),
    },
})

export default Product
