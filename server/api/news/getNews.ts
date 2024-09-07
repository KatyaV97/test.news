import {H3Event} from "h3"
import Parser from "rss-parser"
import {NEWS} from "~/server/constants/urls"
import {
    ErrorBody
} from "~/server/helpers/errorHelpers"

/**
 * /companies
 * Method: GET
 * Получение списка компаний
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const parser = new Parser();

    try {
        return await parser.parseURL(NEWS)
    } catch (exception) {
        return {
            error: true,
            message: exception.message
        } as ErrorBody
    }
})