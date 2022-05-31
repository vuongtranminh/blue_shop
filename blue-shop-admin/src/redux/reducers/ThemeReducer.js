import * as AppConstants from '../../common/AppConstants'

const initState = {
    token: localStorage.getItem(AppConstants.localStorageKey.TOKEN) ? localStorage.getItem(AppConstants.localStorageKey.TOKEN) : '',
    userId: localStorage.getItem(AppConstants.localStorageKey.USER_ID) ? localStorage.getItem(AppConstants.localStorageKey.USER_ID) : null,
}
const ThemeReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_MODE':
            return {
                ...state,
                mode: action.payload
            }
        case 'SET_COLOR':
            return {
                ...state,
                color: action.payload
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'SET_USER_ID':
            return {
                ...state,
                userId: action.payload
            }
        default:
            return state
    }
}

export default ThemeReducer