import { createSlice } from '@reduxjs/toolkit'
import { localStorageKey } from '../../common/AppConstants'

let token = ''
let userId = null
let avatar = ''
let displayName= ''
let email = ''
let checkoutAddressId = ''

if(typeof window !== 'undefined') {
    token = localStorage.getItem(localStorageKey.TOKEN) !== null ? localStorage.getItem(localStorageKey.TOKEN) : ''
    userId = localStorage.getItem(localStorageKey.USER_ID) !== null ? localStorage.getItem(localStorageKey.USER_ID) : null
    avatar = localStorage.getItem(localStorageKey.AVATAR) !== null ? localStorage.getItem(localStorageKey.AVATAR) : ''
    displayName = localStorage.getItem(localStorageKey.DISPLAY_NAME) !== null ? localStorage.getItem(localStorageKey.DISPLAY_NAME) : ''
    email = localStorage.getItem(localStorageKey.EMAIL) !== null ? localStorage.getItem(localStorageKey.EMAIL) : ''
    checkoutAddressId = localStorage.getItem(localStorageKey.CHECKOUT_ADDRESS_ID) !== null ? localStorage.getItem(localStorageKey.CHECKOUT_ADDRESS_ID) : ''
}

const initialState = {
    token: token,
    userId: userId,
    avatar: avatar,
    displayName: displayName,
    email: email,
    checkoutAddressId: checkoutAddressId,
}

export const accountSlide = createSlice({
    name: 'account',
    initialState,
    reducers: {

        login: (state, action) => {
            const token = action.payload
            state.token = token
            localStorage.setItem(localStorageKey.TOKEN, state.token)
        },

        me: (state, action) => {
            const { id, displayName, avatar } = action.payload
            state.userId = id
            state.displayName = displayName
            state.avatar = avatar
            localStorage.setItem(localStorageKey.USER_ID, state.userId)
            localStorage.setItem(localStorageKey.DISPLAY_NAME, state.displayName)
            localStorage.setItem(localStorageKey.AVATAR, state.avatar)
        },

        updateProfile: (state, action) => {
            const { displayName, avatar } = action.payload
            state.displayName = displayName
            state.avatar = avatar
            localStorage.setItem(localStorageKey.DISPLAY_NAME, state.displayName)
            localStorage.setItem(localStorageKey.AVATAR, state.avatar)
        },

        updateLanguage: (state, action) => {
            const language = action.payload
            state.language = language
            localStorage.setItem(localStorageKey.LANGUAGE, state.language)
        },

        logout: (state, action) => {
            state.token = ''
            state.userId = null
            state.avatar = ''
            state.displayName = ''
            state.email = ''
            localStorage.removeItem(localStorageKey.USER_ID)
            localStorage.removeItem(localStorageKey.AVATAR)
            localStorage.removeItem(localStorageKey.DISPLAY_NAME)
            localStorage.removeItem(localStorageKey.EMAIL)
            localStorage.removeItem(localStorageKey.TOKEN)
        },

        setCheckoutAddressId: (state, action) => {
            state.checkoutAddressId = action.payload
            localStorage.setItem(localStorageKey.CHECKOUT_ADDRESS_ID, state.checkoutAddressId)
        }

    },
})

// Action creators are generated for each case reducer function
export const { login, me, updateProfile, updateLanguage, logout, setCheckoutAddressId } = accountSlide.actions

export default accountSlide.reducer