import axios from 'axios'
import './intercepter'

const CATEGORY_SERVICE_PATH = `${process.env.BLUE_API_URL}/categories`

export const getAll = () => {

    return axios({
        method: "GET",
        url: CATEGORY_SERVICE_PATH,
    })
}

export const getById = (id) => {

    return axios({
        method: "GET",
        url: FILE_SERVICE_PATH + "/" + id,
    })

}