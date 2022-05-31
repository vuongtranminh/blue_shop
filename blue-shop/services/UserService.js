import axios from 'axios'
import './intercepter'

const USER_SERVICE_PATH = `${process.env.BLUE_API_URL}/users`

export const checkEmailAvailability = (email) => {

    return axios({
        method: "GET",
        url: USER_SERVICE_PATH + '/checkEmailAvailability',
        params: { 
            email: email, 
        }
    })
}

export const me = () => {

    return axios({
        method: "GET",
        url: USER_SERVICE_PATH + '/me',
    })
}

export const getUserProfile = (id) => {

    return axios({
        method: "GET",
        url: USER_SERVICE_PATH + '/profile/' + id,
    })
}

export const updateUserProfile = (id, user) => {

    return axios({
        method: "PUT",
        url: USER_SERVICE_PATH + '/' + id,
        data: {
            avatar: user.avatar,
            birth: user.birth,
            cover: user.cover,
            displayName: user.displayName,
            gender: user.gender,
            phone: user.phone,
        },
    })
}