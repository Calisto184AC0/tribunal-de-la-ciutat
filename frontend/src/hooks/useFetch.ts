import useSWR from 'swr'

const fetcher = (url: string) =>
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer 776aedf04518019ca4c83b230efbb451ce469f3ea52566ccef3cc0b9ec92668dc1e586bbec1c915262727242be7de57b078ec3ed1deeadb3706d23f59e52d8c3e55b8e232a2047b7cc55218477c9da63e4db4d700a85b7aa59c087bb75dd5d7e3627f9bf5d20d5d20b2d51be382704a7e48a36db333b3f0ed34891081a94b170`,
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
