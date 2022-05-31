import axios from 'axios'
import './intercepter'

const VARIANT_SERVICE_PATH = `${process.env.REACT_APP_BLUE_API_URL}/variants`

export const getAll = (page, size, sort, desc) => {

    return axios({
        method: "GET",
        url: VARIANT_SERVICE_PATH,
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
        url: VARIANT_SERVICE_PATH + "/" + id,
    })

}

export const getVariantsByCategoryId = (categoryId, page, size, sort, desc) => {

    return axios({
        method: "GET",
        url: VARIANT_SERVICE_PATH + "/category",
        params: {
            categoryId,
            page,
            size,
            sort,
            desc,
        },
    })
}

export const insert = (variant) => {

    return axios({
        method: "POST",
        url: VARIANT_SERVICE_PATH,
        data: {
            variantName: variant.variantName,
            price: variant.price,
            image: variant.image,
            color: variant.color,
            size: variant.size,
            quantity: variant.quantity,
            productId: variant.productId,
        },
    })
}

export const update = (id, variant) => {

    return axios({
        method: "PUT",
        url: VARIANT_SERVICE_PATH + "/" + id,
        data: {
            variantName: variant.variantName,
            price: variant.price,
            image: variant.image,
            color: variant.color,
            size: variant.size,
            quantity: variant.quantity,
            productId: variant.productId,
        },
    })
}

export const deleteById = (id) => {

    return axios({
        method: "DELETE",
        url: VARIANT_SERVICE_PATH + "/" + id, 
    })
}