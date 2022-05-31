import moment from 'moment';

export const dateFormat = timestamp => {
    return moment(new Date(timestamp)).format('DD/MM/YYYY')
}