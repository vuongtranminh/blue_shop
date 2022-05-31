import axios from 'axios'
import './intercepter'

const CATEGORY_SERVICE_PATH = `${process.env.REACT_APP_BLUE_API_URL}/categories`

export const getAll = (page, size) => {

    return axios({
        method: "GET",
        url: CATEGORY_SERVICE_PATH,
        params: {
            page: page,
            size: size,
        }
    })
}

export const deleteById = (id) => {

    return axios({
        method: "DELETE",
        url: CATEGORY_SERVICE_PATH + "/" + id,
    })
}

export const update = (id, category) => {

    return axios({
        method: "PUT",
        url: CATEGORY_SERVICE_PATH + "/" + id,
        data: {
            categoryName: category.categoryName,
            description: category.description,
            image: category.image,
        },
    })
}

export const insert = (category) => {

    return axios({
        method: "POST",
        url: CATEGORY_SERVICE_PATH,
        data: {
            categoryName: category.categoryName,
            description: category.description,
            image: category.image,
        },
    })
}