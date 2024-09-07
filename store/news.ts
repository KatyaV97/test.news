import {defineStore} from "pinia"
import {useFetch} from "#app";
import moment from "moment";

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
    }),
    actions: {
        setNews(value): void {
            this.newsList = value
        },
        setAllNews(value): void {
            this.allNewsList = value
        },
        setNewsById(id: string): any {
            const index = this.newsList.items.findIndex(item => item.guid === id)
            if (index > -1) {
                this.selectedNews = this.newsList.items[index]
            }
        },
        setError(error: any) {
            this.error = {
                hasError: error.hasError,
                message: error.message,
            }
        },
        initPagination(count) {
            this.pagination.pageCount = Math.ceil(count / this.pagination.newsCount)
        },
        initNewsByParams() {
            this.newsList.items = this.allNewsList.items.slice()
            if (this.parameters.search !== '') {
                this.newsList.items = this.newsList.items.filter(news => {
                    return news.title.toLowerCase().includes(this.parameters.search)
                })
            }
            if (this.parameters.date) {
                this.newsList.items = this.newsList.items.filter(news => {
                    return moment(news.pubDate).format('DD.MM.YYYY') >= this.parameters.date.from
                    && moment(news.pubDate).format('DD.MM.YYYY') <= this.parameters.date.to
                })
            }
            this.initPagination(this.newsList.items.length)
        },
        async getNews() {
            try {
                const {data, error} = await useFetch('/api/news/getNews');
                if (!error.value
                    && data.value?.items) {
                    this.setAllNews(data.value)
                    return
                }
                this.setError({
                    hasError: true,
                    message: error.message,
                })
            } catch (e) {
                this.setError({
                    hasError: true,
                    message: e.message,
                })
            }
        }
    }
})