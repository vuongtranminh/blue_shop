import React, { useState } from 'react'
import Button from '../components/button/Button'
import Input from '../components/input/Input'
import { useHistory } from "react-router-dom";
import Toast from '../common/toastify'
import { useDispatch } from 'react-redux'
import * as AuthService from "../services/AuthService"
import * as UserService from "../services/UserService"
import * as AppConstants from '../common/AppConstants'

import ThemeAction from '../redux/actions/ThemeAction'
import { Role } from '../common/role';

const Login = () => {

    const history = useHistory();

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value,
        })
    }

    const dispatch = useDispatch()

    const handleLogin = () => {

        AuthService.login(user)
            .then(res => {
                if(res?.data?.accessToken) {
                    localStorage.setItem(AppConstants.localStorageKey.TOKEN, res?.data?.accessToken)
                    dispatch(ThemeAction.setToken(res?.data?.accessToken))
                    return UserService.me()
                }
            })
            .then(res => {
                if(res?.data?.success) {
                    const userSummary = res?.data?.data
                    if(userSummary.roleId !== Role.ADMIN) {
                        Toast.error('Đăng nhập thất bại!')
                        return
                    } 
                    localStorage.setItem(AppConstants.localStorageKey.USER_ID, res?.data?.data.id)
                    dispatch(ThemeAction.setUserId(res?.data?.data.id))
                    history.push("/")
                }
            })
            .catch(err => {
                Toast.error('Đăng nhập thất bại!')
            })
    }

    return (
        <div className="login">
            <div className="login__box">
                <div className="login__box__header">Đăng nhập</div>
                <div className="login__box__body">
                    <div className="login__input">
                        <Input label="Email" name='email' 
                            value={user.email} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="login__input">
                        <Input label="Mật khẩu" name='password' type='password' 
                            value={user.password} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>
                <div className="login__box__footer">
                    <Button label="Đăng nhập" onClick={handleLogin} />
                </div>
            </div>
        </div>
    )
}

export default Login