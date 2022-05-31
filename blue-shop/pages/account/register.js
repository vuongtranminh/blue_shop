import React, { useState } from 'react'
import Helmet from '../../components/Helmet'
import Layout, { Body } from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Link from 'next/link'
import BoxLayout, { BoxBody, BoxHeader } from '../../components/account/BoxLayout'
import * as AuthService from "../../services/AuthService"
import * as UserService from "../../services/UserService"
import { everyValueObjectIsEmpty } from '../../utils/validateObject'
import Toast from '../../common/toastify'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'
import { login, me } from '../../redux/account/accountSlide'

const Register = () => {

    const router = useRouter()

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        displayName: '',
        email: '',
        password: '',
        phone: '',
    })

    const [message, setMessage] = useState({
        displayName: '',
        email: '',
        password: '',
        phone: '',
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
                    email: "Địc chỉ email không hợp lệ",
                })
                return
            }
            
            UserService.checkEmailAvailability(value)
                .then(res => {
                    if(res?.data?.success) {
                        if(!res?.data?.data) {
                            setMessage({
                                ...message,
                                email: "Email đã được sử dụng!",
                            })
                            return
                        }
                    }
                })
        }

        if(name === 'phone') {
            const result = /(84|0[3|5|7|8|9])+([0-9]{8})/.test(value)
            if(!result) {
                setMessage({
                    ...message,
                    phone: "Phone không hợp lệ",
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
                displayName: 'displayName is required',
                email: 'email is required',
                password: 'password is required',
                phone: 'phone is required',
            })
            return false
        }
        return everyValueObjectIsEmpty(message)
    }

    const handleRegister = () => {

        if(!isPassValidate()) return

        AuthService.register(user)
            .then(res => {
                if(res?.data?.success) {
                    Toast.success('Đăng ký thành công!')
                    handelLogin(user)
                } else {
                    Toast.error('Đăng ký thất bại!')
                }
            })
            .catch(err => {
                Toast.error('Đăng ký thất bại!')
            })
    }

    const handelLogin = (user) => {
        AuthService.login(user)
            .then(res => {
                if(res?.data?.accessToken) {
                    dispatch(login(res?.data?.accessToken))
                    return UserService.me()
                }
                router.push('/')
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
        <Helmet title="Register">
            <Layout>
                <Body>
                    <BoxLayout>
                        <BoxHeader>Register</BoxHeader>
                        <BoxBody>
                            <div className="box__input">
                                <Input 
                                    className="input-group--radius" placeholder='Enter Full Name' logo='/svgs/user.svg' 
                                    name="displayName"
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
                                    value={user.displayName} 
                                    message={message.displayName}
                                    
                                />
                            </div>
                            <div className="box__input">
                                <Input 
                                    className="input-group--radius" placeholder='Enter Email' logo='/svgs/envelope.svg' 
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
                                    className="input-group--radius" placeholder='Enter Password' logo='/svgs/lock.svg' 
                                    name="password" 
                                    type="password"
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
                                    value={user.password} 
                                    message={message.password}
                                />
                            </div>
                            <div className="box__input">
                                <Input 
                                    className="input-group--radius" placeholder='Enter Phone Number' logo='/svgs/phone.svg' 
                                    name="phone" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
                                    value={user.phone} 
                                    message={message.phone}
                                />
                            </div>
                            <div className="box__button">
                                <Button size='block' onClick={handleRegister}>Đăng ký</Button>
                            </div>
                            <div className="text-center">
                                <Link href="/account/login">
                                    <a className="box__link">Trở về đăng nhập</a>
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

export default Register