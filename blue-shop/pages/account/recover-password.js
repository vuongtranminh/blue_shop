import React from 'react'
import Helmet from '../../components/Helmet'
import Layout, { Body, Footer, Header } from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Link from 'next/link'
import BoxLayout, { BoxBody, BoxHeader } from '../../components/account/BoxLayout'

const RecoverPassword = () => {
    return (
        <Helmet title="Signup">
            <Layout>
                <Body>
                    <BoxLayout>
                        <BoxHeader>Recover Password</BoxHeader>
                        <BoxBody>
                            <div className="box__input">
                                <Input className="input-group--radius" placeholder='Enter Email' logo='/svgs/envelope.svg' />
                            </div>
                            <div className="box__button">
                                <Button size='block'>Send</Button>
                            </div>
                            <div className="text-center">
                                <Link href="/account/login">
                                    <a className="box__link">Return to Login</a>
                                </Link>
                            </div>
                        </BoxBody>
                    </BoxLayout>
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

export default RecoverPassword