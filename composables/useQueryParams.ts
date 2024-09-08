import qs from "qs"
import {useRouter, useRoute} from 'vue-router'

export function useUrlParams() {
    const router = useRouter()
    const route = useRoute()
    function setQueryParameter(name: string, value: string): void {
        router.push({
            query:
                {
                    ...route.query,
                    [name]: value
                }
        })
    }

    function deleteQueryParameter(name: string): void {
        const params = qs.parse(route.query)
        delete params[name]
        router.push({query: params})
    }

    function deleteQueryParameters(names: string[]): void {
        const params = qs.parse(route.query)
        names.forEach(name => {
            delete params[name]
        })
        router.push({query: params})
    }

    return {
        setQueryParameter,
        deleteQueryParameter,
        deleteQueryParameters
    };
}