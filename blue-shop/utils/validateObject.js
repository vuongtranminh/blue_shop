const REGEX_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})/

export const everyValueObjectIsEmpty = obj => {
    for (let prop in obj) {
        if(obj[prop] !== undefined && obj[prop] !== null && (typeof obj[prop] === 'string' && obj[prop].trim() !== '')) return false
    }
    return true
}

export const someValueObjectIsEmpty = obj => {
    for (let prop in obj) {
        if(obj[prop] === undefined || obj[prop] === null || obj[prop].trim() === '') return true 
    }
    return false
}

export const validPhone = value => {
    return REGEX_PHONE.test(value)
}