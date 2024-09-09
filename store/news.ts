import {defineStore} from "pinia"
import {useFetch} from "#app";
import moment from "moment";
import {NewsState} from "./newsTypes";
import {News, NewsItem, Error} from "../types/news";

export const useNewsStore = defineStore('newsStore', {
    state: () => ({
        newsList: [],
        allNewsList: [],
        selectedNews: null,
        error: null,
        pagination: {
            newsCount: 5,
            pageCount: 1
        },
        parameters: {
            search: '',
            date: null,
            page: 1
        }
    }) as NewsState,
    actions: {
        setAllNews(value: News[]): void {
            this.allNewsList = value
        },
        setNewsById(id: string): void {
            const index = this.newsList.items.findIndex((item: NewsItem): boolean => item.guid === id)
            if (index > -1) {
                this.selectedNews = this.newsList.items[index]
            }
        },
        setError(error: Error): void {
            this.error = {
                hasError: error.hasError,
                message: error.message,
            }
        },
        initPagination(count: number): void {
            this.pagination.pageCount = Math.ceil(count / this.pagination.newsCount)
        },
        initNewsByParams(): void {
            if (!this.allNewsList?.items) {
                this.newsList.items = [];
                return
            }
            this.newsList.items = this.allNewsList.items.slice()
            if (this.parameters.search !== '') {
                this.newsList.items = this.newsList.items.filter((news: NewsItem): boolean => {
                    return news.title.toLowerCase().includes(this.parameters.search)
                })
            }
            if (this.parameters.date) {
                this.newsList.items = this.newsList.items.filter((news: NewsItem): boolean => {
                    return moment(news.pubDate).format('DD.MM.YYYY') >= this.parameters.date.from
                        && moment(news.pubDate).format('DD.MM.YYYY') <= this.parameters.date.to
                })
            }
            this.initPagination(this.newsList.items.length)
        },
        async getNews(): Promise<void> {
            try {
                const {data, error} = await useFetch('/api/news/getNews');
                if (!error.value
                    && data.value?.items) {
                    this.setAllNews(data.value)
                    return
                }
                this.setError({
                    hasError: true,
                    message: 'Произошла ошибка, попробуйте позже',
                })
            } catch {
                this.setError({
                    hasError: true,
                    message: 'Произошла ошибка, попробуйте позже',
                })
            }
        }
    }
})