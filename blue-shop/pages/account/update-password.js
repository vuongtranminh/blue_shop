import React from 'react'
import Helmet from '../../components/Helmet'
import Layout, { Body } from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Input from '../../components/Input'
import Button from '../../components/Button'
import BoxLayout, { BoxBody, BoxHeader } from '../../components/account/BoxLayout'

const UpdatePassword = () => {
    return (
        <Helmet title="Signup">
            <Layout>
                <Body>
                    <BoxLayout>
                        <BoxHeader>UPDATE PASSWORD</BoxHeader>
                        <BoxBody>
                            <div className="box__input">
                                <Input className="input-group--radius" placeholder='Enter Old Password' label='Old Password' />
                            </div>
                            <div className="box__input">
                                <Input className="input-group--radius" placeholder='Enter New Password' label='New Password' />
                            </div>
                            <div className="box__input">
                                <Input className="input-group--radius" placeholder='Confirm New Password' label='Confirm Password' />
                            </div>
                            <div className="box__button">
                                <Button size='block'>Lưu</Button>
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

export default UpdatePassword