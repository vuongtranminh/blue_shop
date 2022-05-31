import axios from 'axios'
import * as AppConstants from '../common/AppConstants'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = typeof localStorage !== "undefined" ? localStorage.getItem(AppConstants.localStorageKey.TOKEN) : null
    if(config.url.indexOf(process.env.BLUE_API_URL) !== -1) {
        if (token) {
            config.headers['token'] = `Bearer ${token}`
        }
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.status === AppConstants.statusCode.UNAUTHORIZED) {

        localStorage.removeItem(AppConstants.localStorageKey.USER_ID)
        localStorage.removeItem(AppConstants.localStorageKey.AVATAR)
        localStorage.removeItem(AppConstants.localStorageKey.DISPLAY_NAME)
        localStorage.removeItem(AppConstants.localStorageKey.EMAIL)
        localStorage.removeItem(AppConstants.localStorageKey.TOKEN)
        localStorage.removeItem(AppConstants.localStorageKey.CART_ITEMS)
        localStorage.removeItem(AppConstants.localStorageKey.CART_TOTAL_ITEMS)
        localStorage.removeItem(AppConstants.localStorageKey.CART_ITEMS_CHECKED)
        
        window.location.href = `${process.env.BASE_URL}/account/login`
    } else return response
    
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.data?.status !== null && error?.response?.data?.status === AppConstants.statusCode.UNAUTHORIZED) {

        localStorage.removeItem(AppConstants.localStorageKey.USER_ID)
        localStorage.removeItem(AppConstants.localStorageKey.AVATAR)
        localStorage.removeItem(AppConstants.localStorageKey.DISPLAY_NAME)
        localStorage.removeItem(AppConstants.localStorageKey.EMAIL)
        localStorage.removeItem(AppConstants.localStorageKey.TOKEN)
        localStorage.removeItem(AppConstants.localStorageKey.CART_ITEMS)
        localStorage.removeItem(AppConstants.localStorageKey.CART_TOTAL_ITEMS)
        localStorage.removeItem(AppConstants.localStorageKey.CART_ITEMS_CHECKED)
  
        window.location.href = `${process.env.BASE_URL}/account/login`
    }
    return Promise.reject(error.response);
  });