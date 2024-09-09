import {useNewsStore} from "~/store/news";
import {useRoute} from "vue-router";

export function initParams(): void {
    const newsStore = useNewsStore()
    const route = useRoute()
    if (route.query?.page) {
        newsStore.parameters.page = Number(route.query?.page)
    }
    if (route.query?.search) {
        newsStore.parameters.search = route.query?.search.toString()
    }
    if (route.query?.dateFrom && route.query?.dateTo) {
        newsStore.parameters.date = {
            from: route.query?.dateFrom.toString(),
            to: route.query?.dateTo.toString()
        }
    }
}