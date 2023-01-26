import useSWR from 'swr'

const fetcher = (url: string) =>
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer c2e5d9331e4aaa09cd34fef09cf7b13978cb5fb76392e3452632026d3e0b49ac480b913898279a5b56abead8484f5b345fbd47c7eb7cc117c389bc57f80c73445350a9619a05736a0254e44fdb7fe388a39366188d4f961994d4551f663f6dd6ce4445befd4aa59df0432c0bf12f04eccb1000a4ed2a9f5347d1383592cdb1a6`,
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
