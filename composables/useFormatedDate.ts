import moment from "moment/moment";

export function getShortFormattedDate(date: string): string {
    return moment(date).locale('ru').format("D.MM")
}

export function getFullFormattedDate(date: string): string {
    return moment(date).locale('ru').format("D MMMM YYYY")
}