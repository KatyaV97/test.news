import {useNewsStore} from "~/store/news";
import {useRoute} from "vue-router";

export function initParams() {
    const newsStore = useNewsStore()
    const route = useRoute()
    if (route.query?.page) {
        newsStore.parameters.page = route.query?.page
    }
    if (route.query?.search) {
        newsStore.parameters.search = route.query?.search
    }
    if (route.query?.dateFrom && route.query?.dateTo) {
        newsStore.parameters.date = {
            from: route.query?.dateFrom,
            to: route.query?.dateTo
        }
    }
}