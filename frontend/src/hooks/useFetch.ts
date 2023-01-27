import useSWR from 'swr'

const fetcher = (url: string) =>
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer bec529958f1f94ce19e763a77254d2f65c800b47ab08bd256a5c771694b03e4dff0361aa6c54babb0faa4835c9c12e053409604d335b502021ca8576009a3d6ef7217a55fa6f2533b06e1bd76e1f16caf58c02e5eb45c37946e053ca110c403b449675f8ab344731ba3c7da8fab3324a1d353ca36eee971c20f46409139d2e3d`,
        },
    }).then(res => res.json())

export type FetchReturn<T> = {
    content: T
    error: any
}

type UseFetch = <T>(url: string) => FetchReturn<T>

const useFetch: UseFetch = url => {
    const { data: content, error } = useSWR(url, fetcher)

    return {
        content,
        error,
    }
}

export default useFetch
