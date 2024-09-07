import moment from "moment/moment";

export function getShortFormattedDate(date) {
    return moment(date).locale('ru').format("D.MM")
}

export function getFullFormattedDate(date) {
    return moment(date).locale('ru').format("D MMMM YYYY")
}