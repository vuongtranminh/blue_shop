import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'

import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'
import category from '../assets/fake-data/category'
import productData from '../assets/fake-data/products'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CategoriesSlider from '../components/index/CategoriesSlider'
import Layout, { Body } from '../components/Layout'
import * as ProductService from '../services/ProductService'

const PAGE = 1
const SIZE = 12
const NEW_SIZE = 8

const Home = () => {

    const [newProducts, setNewProducts] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        ProductService.getAll(PAGE, NEW_SIZE)
            .then(res => {
                if(res?.data?.success) {
                    const data = res.data.data
                    const productList = data?.content
                    setNewProducts(productList)
                }
            })
    }
    // const [heroSliderData, setHeroSliderData] = useState([])
    // const [policy, setPolicy] = useState([])
    // const [productData, setProductData] = useState([])

    // useEffect(() => {
    //     setHeroSliderData()
    // }, [])

    // useEffect(() => {
    //     setPolicy()
    // }, [])

    // useEffect(() => {
    //     setProductData()
    // }, [])

    return (
        <Helmet title="Trang chủ">
            <Layout>
                <Body>
                    <div className="home">
                        {/* hero slider */}
                        <HeroSlider
                            data={heroSliderData}
                            control={true}
                            auto={false}
                            timeOut={5000}
                        />
                        {/* end hero slider */}

                        {/* policy section */}
                        {/* <Section>
                    <SectionBody>
                        <Grid
                            col={4}
                            mdCol={2}
                            smCol={1}
                            gap={20}
                        >
                            {
                                policy.map((item, index) => <Link key={index} href="/policy">
                                    <PolicyCard
                                        name={item.name}
                                        description={item.description}
                                        icon={item.icon}
                                    />
                                </Link>)
                            }
                        </Grid>
                    </SectionBody>
                </Section> */}
                        {/* end policy section */}

                        <Section>
                            <SectionTitle>
                                Categories
                            </SectionTitle>
                            <SectionBody>
                                <CategoriesSlider />
                            </SectionBody>
                        </Section>

                        {/* best selling section */}
                        <Section>
                            <SectionTitle>
                                top sản phẩm bán chạy trong tuần
                            </SectionTitle>
                            <SectionBody>
                                <Grid col={2} mdCol={2} xlCol={4} gap={20}>
                                    { newProducts.map((item, index) => <ProductCard key={index} item={item} /> ) }
                                </Grid>
                            </SectionBody>
                        </Section>
                        {/* end best selling section */}

                        {/* new arrival section */}
                        <Section>
                            <SectionTitle>
                                sản phẩm mới
                            </SectionTitle>
                            <SectionBody>
                                <Grid col={2} mdCol={2} xlCol={4} gap={20}>
                                    { newProducts.map((item, index) => <ProductCard key={index} item={item} /> ) }
                                </Grid>
                            </SectionBody>
                        </Section>
                        {/* end new arrival section */}

                        {/* banner */}
                        <Section>
                            <SectionBody>
                                <Link href="/catalog">
                                    <img src="/images/banner.png" alt="" />
                                </Link>
                            </SectionBody>
                        </Section>
                        {/* end banner */}

                        {/* popular product section */}
                        <Section>
                            <SectionTitle>
                                phổ biến
                            </SectionTitle>
                            <SectionBody>
                                <Grid col={2} mdCol={2} xlCol={4} gap={20}>
                                    { newProducts.map((item, index) => <ProductCard key={index} item={item} /> ) }
                                </Grid>
                            </SectionBody>
                        </Section>
                        {/* end popular product section */}
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

export default Home
