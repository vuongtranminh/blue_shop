import axios from 'axios'
import './intercepter'

const ADDRESS_SERVICE_PATH = `${process.env.BLUE_API_URL}/addresses`

export const insert = (info, userId) => {

    return axios({
        method: "POST",
        url: ADDRESS_SERVICE_PATH,
        params: {
            userId,
        },
        data: {
            address: info.address,
            commune: info.commune,
            district: info.district,
            city: info.city,
            name: info.name,
            phone: info.phone,
            type: info.type,
        },
    })
}

export const getAddresses = (userId) => {
    
    return axios({
        method: "GET",
        url: ADDRESS_SERVICE_PATH + '/user',
        params: {
            userId,
        },
    })
}

export const update = (id, info, userId) => {

    return axios({
        method: "PUT",
        url: ADDRESS_SERVICE_PATH + '/' + id,
        params: {
            userId,
        },
        data: {
            address: info.address,
            commune: info.commune,
            district: info.district,
            city: info.city,
            name: info.name,
            phone: info.phone,
            type: info.type,
        },
    })
}

export const deleteAddress = (id, userId) => {

    return axios({
        method: "DELETE",
        url: ADDRESS_SERVICE_PATH + '/' + id,
        params: {
            userId,
        },
    })
}