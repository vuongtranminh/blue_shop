import axios from 'axios'
import './intercepter'

const PRODUCT_SERVICE_PATH = `${process.env.REACT_APP_BLUE_API_URL}/products`

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

export const insert = (product) => {

    return axios({
        method: "POST",
        url: PRODUCT_SERVICE_PATH,
        data: {
            productName: product.productName,
            image01: product.image01,
            image02: product.image02,
            categoryId: product.categoryId,
            description: product.description,
        },
    })
}

export const update = (id, product) => {

    return axios({
        method: "PUT",
        url: PRODUCT_SERVICE_PATH + "/" + id, 
        data: {
            productName: product.productName,
            image01: product.image01,
            image02: product.image02,
            categoryId: product.categoryId,
            description: product.description,
        },
    })
}

export const deleteById = (id) => {

    return axios({
        method: "DELETE",
        url: PRODUCT_SERVICE_PATH + "/" + id, 
    })
}