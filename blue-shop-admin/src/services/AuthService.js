import axios from 'axios'
import sha256 from 'sha256'
import './intercepter'

const AUTH_SERVICE_PATH = `${process.env.REACT_APP_BLUE_API_URL}/auth`

export const logout = () => {
    return axios({
        method: "POST",
        url: AUTH_SERVICE_PATH + '/logout',
        data: {}
    })
};

export const login = (user) => {

    const encryptedPassword = sha256(user.password)

    return axios({
        method: "POST",
        url: AUTH_SERVICE_PATH + '/login',
        data: {
            email: user.email,
            password: encryptedPassword,
        }
    })
}