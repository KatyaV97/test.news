import type {News, NewsItem, Error, Pagination, Parameters} from "../types/news";

export type NewsState = {
    newsList: News[],
    allNewsList: News[],
    selectedNews: NewsItem | null,
    error: Error | null,
    pagination: Pagination,
    parameters: Parameters
}
