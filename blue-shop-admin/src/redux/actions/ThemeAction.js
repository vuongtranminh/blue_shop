const setMode = mode => {
    return {
        type: 'SET_MODE',
        payload: mode
    }
}

const setColor = color => {
    return {
        type: 'SET_COLOR',
        payload: color
    }
}

const getTheme = () => {
    return {
        type: 'GET_THEME'
    }
}

const setToken = token => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}

const setUserId = userId => {
    return {
        type: 'SET_USER_ID',
        payload: userId
    }
}

const getUserId = () => {
    return {
        type: 'GET_USER_ID'
    }
}

const exportDefault = {
    setColor,
    setMode,
    getTheme,
    setToken,
    setUserId,
    getUserId,
}

export default exportDefault