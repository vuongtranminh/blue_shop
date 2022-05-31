import React, { useState } from 'react'
import Helmet from '../../components/Helmet'
import Layout, { Body } from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Link from 'next/link'
import BoxLayout, { BoxBody, BoxFooter, BoxHeader } from '../../components/account/BoxLayout'
import * as AuthService from "../../services/AuthService"
import * as UserService from "../../services/UserService"
import { everyValueObjectIsEmpty } from '../../utils/validateObject'
import { useRouter } from 'next/dist/client/router'
import Toast from '../../common/toastify'
import { useDispatch } from 'react-redux'
import { login, me } from '../../redux/account/accountSlide'

const Login = () => {

    const router = useRouter()

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [message, setMessage] = useState({
        email: '',
        password: '',
    })

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleBlur = (name, value) => {
        if(value.trim() === '') {
            setMessage({
                ...message,
                [name]: `${name} là bắt buộc`
            })
            return
        }

        if(name === 'email') {
            const result = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)
            if(!result) {
                setMessage({
                    ...message,
                    email: "Địa chỉ email không hợp lệ",
                })
                return
            }
        }

        setMessage({
            ...message,
            [name]: '',
        })
    }

    const handleFocus = (name) => {
        setMessage({
            ...message,
            [name]: '',
        })
    }

    const isPassValidate = () => {
        if(everyValueObjectIsEmpty(user)) {
            setMessage({
                email: 'Email là bắt buộc',
                password: 'Mật khẩu là bắt buộc',
            })
            return false
        }
        return everyValueObjectIsEmpty(message)
    }

    const handleLogin = () => {

        if(!isPassValidate()) return

        AuthService.login(user)
            .then(res => {
                if(res?.data?.accessToken) {
                    dispatch(login(res?.data?.accessToken))
                    return UserService.me()
                }
            })
            .then(res => {
                if(res?.data?.success) {
                    const userSummary = res?.data?.data
                    dispatch(me(userSummary))
                    router.push('/')
                }
            })
            .catch(err => {
                Toast.error('Đăng nhập thất bại!')
            })
    }

    return (
        <Helmet title="Đăng nhập">
            <Layout>
                <Body>
                    <BoxLayout>
                        <BoxHeader>Welcome</BoxHeader>
                        <BoxBody>
                            <div className="box__input">
                                <Input 
                                    className="input-group--radius" placeholder='Email' logo='/svgs/envelope.svg'
                                    name="email"
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
                                    value={user.email} 
                                    message={message.email} 
                                />
                            </div>
                            <div className="box__input">
                                <Input 
                                    className="input-group--radius" placeholder='Mật khẩu' logo='/svgs/lock.svg'
                                    name="password" 
                                    type="password"
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
                                    value={user.password} 
                                    message={message.password} 
                                />
                            </div>
                            <div className="box__button box__button-login">
                                <Button size='block' onClick={handleLogin}>Đăng nhập</Button>
                            </div>
                            <div className="text-center">
                                <Link href="/account/recover-password">
                                    <a className="box__link">Quên mật khẩu?</a>
                                </Link>
                            </div>
                        </BoxBody>
                        <BoxFooter>
                            <div className="text-center">hoặc đăng nhập với</div>
                            <div className="f aic jcb">
                                <div className="box__button-social box__button-social--twitter">
                                    <Button size='block' background='twitter'>
                                        <img src="/svgs/twitter.svg" />
                                        Twitter
                                    </Button>
                                </div>
                                <div className="box__button-social box__button-social--facebook">
                                    <Button size='block' background='facebook'>
                                        <img src="/svgs/facebook.svg" />
                                        Facebook
                                    </Button>
                                </div>

                            </div>
                            <div className="text-center">Bạn chưa có tài khoản?
                                <Link href="/account/register">
                                    <a className="box__link ml-10">Đăng ký!</a>
                                </Link>
                            </div>
                        </BoxFooter>
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

export default Login