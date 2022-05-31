import axios from 'axios'
import './intercepter'

const CART_SERVICE_PATH = `${process.env.BLUE_API_URL}/carts`

export const insert = (itemCart) => {

    return axios({
        method: "POST",
        url: CART_SERVICE_PATH,
        data: {
            variantId: itemCart.variantId,
            quantity: itemCart.quantity,
        }
    })
}

export const getCart = () => {

    return axios({
        method: "GET",
        url: CART_SERVICE_PATH + "/user",
    })
}

export const updateById = (id, userId, itemCart) => {

    return axios({
        method: "PUT",
        url: CART_SERVICE_PATH + '/' + id,
        params: {
            userId,
        },
        data: {
            quantity: itemCart.quantity,
            variantId: itemCart.variantId,
        },
    })
}

export const deleteById = (id, userId) => {

    return axios({
        method: "DELETE",
        url: CART_SERVICE_PATH + "/" + id,
        params: {
            userId,
        },
    })
}