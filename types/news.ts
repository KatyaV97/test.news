export type News = {
    description: string
    image: HeaderImage,
    items: NewsItem[]
    language: string,
    link: string,
    title: string,
    ttl: string,
    enclosure?: EnclosureImage
}

interface IImage {
    url: string,
}
interface HeaderImage extends IImage {
    link: string,
    title: string,
}

interface EnclosureImage extends IImage {
    length: string,
    type: string,
}

export type NewsItem = {
    categories: string[],
    content: string,
    contentSnippet: string,
    guid: string,
    isoDate: string,
    link: string,
    pubDate: string,
    title: string,
}

export type Error = {
    hasError: boolean,
    message: string
}

export type Pagination = {
    newsCount: number,
    pageCount: number,
}

export type Parameters = {
    search: string,
    date: DateRange | null,
    page: number,
}

export type DateRange = {
    from: string,
    to: string
}