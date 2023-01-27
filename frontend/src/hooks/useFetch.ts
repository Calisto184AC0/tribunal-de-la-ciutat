import useSWR from 'swr'

const fetcher = (url: string) =>
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ab2f3b034c50a077efb61793bbd63464710b149a1f6f241e74caeef6b9c4243cde00c3d542ee5d20fa0a1331770187595612b4abed138781ff4abf9da763ba53ee6585c5b21809c824e6f96c5395abb3ae029a0adcabd539de59b7572a3da1c62214f73d2ce2eafae5e8ea61daa562d183c21ffd1c8244cedea683d071a41c65`,
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
