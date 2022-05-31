export const getParams = (url) => {
    const index = url.indexOf('?')
    if(index >= 0) {
        const queries = url.slice(index+1).split('&')
        let param
        const params = {}
        queries.forEach(query => {
            param = query.split('=') 
            params[param[0]] = param[1]
        })
        return params
    } else {
        return null
    }
}