import moment from "moment";

export const isValidDate = (date = 'dateNotValid') => {
    return date ? (typeof date === 'string' && new Date(date).getTime() > 0 && moment(date).isValid())  : true
}

export const isValidRating = rating => {
    return rating >= 0 && rating <=10;
}