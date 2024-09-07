import {defineStore} from "pinia"
import {useFetch} from "#app";
import {error} from "vscode-jsonrpc/lib/common/is";

export const useNewsStore = defineStore('newsStore', {
    state: () => ({
        newsList: [],
        selectedNews: null,
        error: null,
    }),
    actions: {
        setSelectedNews(value): void {
            this.selectedNews = value
        },
        setNews(value): void {
            this.newsList = value
        },
        setNewsById(id: string): any {
            const index = this.newsList.items.findIndex(item => item.guid === id)

            console.log(index)
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
        async getNews() {
            try {
                const {data, pending, error} = await useFetch('/api/news/getNews');
                console.log(data.value.items)
                console.log(!error.value)
                if (!error.value) {
                    console.log(data.value)
                    this.setNews(data.value)
                    return
                }
                this.setError({
                    hasError: true,
                    message: error.message,
                })
            } catch (e) {
                console.log(e)
                this.setError({
                    hasError: true,
                    message: e.message,
                })
            }
        }
    }
})