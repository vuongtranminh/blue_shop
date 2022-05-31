import React, { useState, useEffect } from 'react';
import Input from './Input'
import Button from './Button'

const FormAccount = (props) => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        phone: "",
        activeCode: "",
        accountName: "",
    })

    const [message, setMessage] = useState({
        error: true,
        email: "",
        password: "",
        phone: "",
        activeCode: "",
        accountName: "",
    })

    const { isRegister, type } = props.method

    useEffect(() => {
        setMessage({
            error: true,
            email: "",
            password: "",
            phone: "",
            activeCode: "",
            accountName: "",
        })
    }, [props.method])

    const handleChange = (name, value) => {
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(message.error)
        if (message.error) {
            return
        }
        console.log(user);
        // call api here

    }

    const handleBlur = (name, value) => {

        if (name === 'accountName') {
            if (value.trim() !== '') {
                setMessage({
                    ...message,
                    accountName: null,
                })
            } else {
                setMessage({
                    ...message,
                    error: true,
                    accountName: "Tên không được để trống",
                })
            }
        }

        if (name === 'email') {
            const result = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)
            if (result) {
                setMessage({
                    ...message,
                    email: null,
                })
            } else {
                setMessage({
                    ...message,
                    error: true,
                    email: "Địa chỉ email của bạn không hợp lệ",
                })
            }
        }

        if (name === "password") {
            if (value.length > 5) {
                setMessage({
                    ...message,
                    password: null,
                })
            } else {
                setMessage({
                    ...message,
                    error: true,
                    password: "Mật khẩu phải chứa ít nhất 6 chữ số",
                })
            }
        }

        if (name === "activeCode") {
            if (value.length === 6) {
                setMessage({
                    ...message,
                    activeCode: null,
                })
            } else {
                setMessage({
                    ...message,
                    error: true,
                    activeCode: "Mã xác nhận phải gồm 6 ký tự số",
                })
            }
        }
    }

    const handleFocus = (name) => {
        setMessage({
            ...message,
            error: false,
            [name]: null,
        })
    }

    const renderForm = () => {
        if (isRegister) {
            if (type === 'email') {
                return (
                    <>
                        <Input
                            label="Tên của bạn"
                            name="accountName"
                            placeholder="Họ và tên của bạn"
                            value={user.accountName}
                            onChange={(name, value) => handleChange(name, value)}
                            onBlur={(name, value) => handleBlur(name, value)}
                            message={message.accountName}
                            onFocus={(name) => handleFocus(name)}
                            required={true}
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Địa chỉ email"
                            value={user.email}
                            onChange={(name, value) => handleChange(name, value)}
                            onBlur={(name, value) => handleBlur(name, value)}
                            message={message.email}
                            onFocus={(name) => handleFocus(name)}
                            required={true}
                        />

                        <Input
                            label="Mật khẩu"
                            autoComplete="off"
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                            value={user.password}
                            onChange={(name, value) => handleChange(name, value)}
                            onBlur={(name, value) => handleBlur(name, value)}
                            message={message.password}
                            onFocus={(name) => handleFocus(name)}
                            required={true}
                        />

                        <Input
                            label="Mã xác nhận"
                            name="activeCode"
                            type="number"
                            placeholder="Nhập mã xác nhận gồm 6 ký tự"
                            value={user.activeCode}
                            onChange={(name, value) => handleChange(name, value)}
                            onBlur={(name, value) => handleBlur(name, value)}
                            message={message.activeCode}
                            onFocus={(name) => handleFocus(name)}
                            required={true}
                            titleInputButton={"Lấy mã"}
                        />
                    </>
                )
            } else {
                return (
                    <>
                        <Input
                            label="Tên của bạn"
                            name="accountName"
                            placeholder="Họ và tên của bạn"
                            value={user.accountName}
                            onChange={(name, value) => handleChange(name, value)}
                            onBlur={(name, value) => handleBlur(name, value)}
                            message={message.accountName}
                            onFocus={(name) => handleFocus(name)}
                            required={true}
                        />

                        <Input
                            label="Số điện thoại"
                            defaultCountry="VN"
                            name="phone"
                            type="phone"
                            placeholder="Số điện thoại"
                            value={user.phone}
                            onChange={(name, value) => handleChange(name, value)}
                        />

                        <Input
                            label="Mã xác nhận"
                            name="activeCode"
                            type="number"
                            placeholder="Nhập mã xác nhận gồm 6 chữ số"
                            value={user.activeCode}
                            onChange={(name, value) => handleChange(name, value)}
                            onBlur={(name, value) => handleBlur(name, value)}
                            message={message.activeCode}
                            onFocus={(name) => handleFocus(name)}
                            required={true}
                            titleInputButton={"Lấy mã"}
                        />
                    </>
                )
            }

        } else {
            if (type === 'email') {
                return (
                    <>
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Địa chỉ email"
                            value={user.email}
                            onChange={(name, value) => handleChange(name, value)}
                            onBlur={(name, value) => handleBlur(name, value)}
                            message={message.email}
                            onFocus={(name) => handleFocus(name)}
                            required={true}
                        />

                        <Input
                            label="Mật khẩu"
                            autoComplete="off"
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                            value={user.password}
                            onChange={(name, value) => handleChange(name, value)}
                            onBlur={(name, value) => handleBlur(name, value)}
                            message={message.password}
                            onFocus={(name) => handleFocus(name)}
                            required={true}
                        />
                    </>
                )
            } else {
                return (
                    <>
                        <Input
                            label="Số điện thoại"
                            defaultCountry="VN"
                            name="phone"
                            type="phone"
                            placeholder="Số điện thoại"
                            value={user.phone}
                            onChange={(name, value) => handleChange(name, value)}
                        />

                        <Input
                            label="Mã xác nhận"
                            name="activeCode"
                            type="number"
                            placeholder="Nhập mã xác nhận gồm 6 chữ số"
                            value={user.activeCode}
                            onChange={(name, value) => handleChange(name, value)}
                            onBlur={(name, value) => handleBlur(name, value)}
                            message={message.activeCode}
                            onFocus={(name) => handleFocus(name)}
                            required={true}
                            titleInputButton={"Lấy mã"}
                        />
                    </>
                )
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {renderForm()}
            <div className="account__btn">
                <Button size="sm" type="submit">{isRegister ? "Đăng ký" : "Đăng nhập"}</Button>
            </div>
        </form>
    );
};

export default FormAccount;
