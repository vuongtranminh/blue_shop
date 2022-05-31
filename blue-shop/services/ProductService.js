import axios from 'axios'
import './intercepter'

const PRODUCT_SERVICE_PATH = `${process.env.BLUE_API_URL}/products`

export const getAll = (page, size, sort, desc) => {

    return axios({
        method: "GET",
        url: PRODUCT_SERVICE_PATH,
        params: {
            page,
            size,
            sort,
            desc,
        },
    })
}

export const searchProduct = (searchText) => {

    return axios({
        method: "GET",
        url: PRODUCT_SERVICE_PATH + "/search",
        params: {
            searchText,
        },
    })
}

export const getById = (id) => {

    return axios({
        method: "GET",
        url: PRODUCT_SERVICE_PATH + "/" + id,
    })

}

export const getProductsByCategoryId = (categoryId, page, size, sort, desc) => {

    return axios({
        method: "GET",
        url: PRODUCT_SERVICE_PATH + "/category",
        params: {
            categoryId,
            page,
            size,
            sort,
            desc,
        },
    })
}