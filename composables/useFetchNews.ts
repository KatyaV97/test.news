import {useFetch} from "#app";

export async function useFetchNews() {
    const {data, pending, error} = await useFetch('/api/news/getNews');
    console.log(data)
    return {data, pending, error};
}