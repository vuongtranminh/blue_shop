import axios from 'axios'
import './intercepter'

const USER_SERVICE_PATH = `${process.env.REACT_APP_BLUE_API_URL}/users`

export const me = () => {

    return axios({
        method: "GET",
        url: USER_SERVICE_PATH + '/me',
    })
}

export const getAll = () => {

    return axios({
        method: "GET",
        url: USER_SERVICE_PATH,
    })
}
