import axios from 'axios'
import './intercepter'

const ORDER_SERVICE_PATH = `${process.env.BLUE_API_URL}/orders`

export const insert = (order) => {

    return axios({
        method: "POST",
        url: ORDER_SERVICE_PATH,
        data: { 
            totalPrice: order.totalPrice,
            buyerName: order.buyerName,
            address: order.address,
            phone: order.phone,
            city: order.city,
            district: order.district,
            commune: order.commune,
            note: order.note,
            items: order.items,
            status: order.status,
        },
    })
}

export const getOrdersByUserId = (userId, page, size, sort, desc) => {

    return axios({
        method: "GET",
        url: ORDER_SERVICE_PATH + "/user",
        params: {
            userId,
            page,
            size,
            sort,
            desc,
        },
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