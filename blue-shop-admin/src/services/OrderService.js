import axios from 'axios'
import './intercepter'

const ORDER_SERVICE_PATH = `${process.env.REACT_APP_BLUE_API_URL}/orders`

export const getAll = (page, size) => {

    return axios({
        method: "GET",
        url: ORDER_SERVICE_PATH,
        params: {
            page: page,
            size: size,
        }
    })
}

export const cancelOrder = (id, userId) => {

    return axios({
        method: "PUT",
        url: ORDER_SERVICE_PATH + "/cancelOrder/" + id,
        params: {
            userId
        },
    })
}

export const acceptOrder = (id, userId) => {

    return axios({
        method: "PUT",
        url: ORDER_SERVICE_PATH + "/accepted/" + id,
        params: {
            userId
        },
    })
}

export const deliveryOrder = (id, userId) => {

    return axios({
        method: "PUT",
        url: ORDER_SERVICE_PATH + "/delivered/" + id,
        params: {
            userId
        },
    })
}

export const paymentOrder = (id, userId) => {

    return axios({
        method: "PUT",
        url: ORDER_SERVICE_PATH + "/paymented/" + id,
        params: {
            userId
        },
    })
}

export const getById = (id, userId) => {

    return axios({
        method: "GET",
        url: ORDER_SERVICE_PATH + "/" + id,
        params: {
            userId
        },
    })
}