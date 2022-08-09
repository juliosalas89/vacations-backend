import moment from "moment";

export const isValidDate = (date = 'dateNotValid') => {
    return date ? (typeof date === 'string' && new Date(date).getTime() > 0 && moment(date).isValid())  : true
}