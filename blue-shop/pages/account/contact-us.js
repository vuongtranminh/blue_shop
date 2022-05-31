import React from 'react'
import Helmet from '../../components/Helmet'
import Layout, { Body, Footer, Header } from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Input from '../../components/Input'
import Button from '../../components/Button'
import BoxLayout, { BoxBody, BoxHeader } from '../../components/account/BoxLayout'

const ContactUs = () => {
    return (
        <Helmet title="Contact Us">
            <Layout>
                <BoxBody>
                    <BoxLayout>
                        <BoxHeader>
                            CONTACT US
                        </BoxHeader>
                        <BoxBody className="box__body--radius box__body--box-shadow">
                            <div className="box__input">
                                <Input placeholder='Enter Name' label='Name' />
                            </div>
                            <div className="box__input">
                                <Input placeholder='Enter Email Address' label='Email' />
                            </div>
                            <div className="box__input">
                                <Input placeholder='Enter your query...' label='Comments' type='textarea' />
                            </div>
                            <div className="box__button">
                                <Button size='block'>Send</Button>
                            </div>
                        </BoxBody>
                    </BoxLayout>
                </BoxBody>
            </Layout>
        </Helmet>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'header']),
    },
})

export default ContactUs