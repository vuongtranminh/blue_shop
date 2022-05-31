import React from 'react'
import Helmet from '../../components/Helmet'
import Layout, { Body, Header } from '../../components/account/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CardPayment from '../../components/account/CardPayment'

const Payment = () => {
    return (
        <Helmet title="Update Address">
            <Layout>
                <Header>
                    PAYMENT
                </Header>
                <Body className="account__body--radius account__body--box-shadow p-0">
                    <CardPayment />
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

export default Payment