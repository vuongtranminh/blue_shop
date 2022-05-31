import axios from 'axios'
import './intercepter'

const FILE_SERVICE_PATH = `${process.env.REACT_APP_BLUE_API_URL}/files`

export const uploadFile = (file) => {

    const formData = new FormData()
    formData.append('file', file);

    return axios({
        method: "POST",
        url: FILE_SERVICE_PATH,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' }
    })
}

export const uploadMultipleFiles = (files) => {

    const formData = new FormData()
    formData.append('files', files)

    return axios({
        method: "POST",
        url: FILE_SERVICE_PATH + "/uploadMultipleFiles",
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' }
    })
}

export const readDetailFile = (fileNameUrl) => {

    return axios({
        method: "GET",
        url: fileNameUrl,
    })
}

export const getUploadedFiles = () => {

    return axios({
        method: "GET",
        url: FILE_SERVICE_PATH,
    })
}