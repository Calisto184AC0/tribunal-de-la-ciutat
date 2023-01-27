import Image from 'next/image'
import { useEffect, useState } from 'react'
import CarruselAPI, { CarruselImage } from '../types'

const useCarrusel = () => {
    const [data, setData] = useState<JSX.Element[] | null>(null)

    const fetchStrapi = async () => {
        try {
            const response = await fetch(
                `http://tribunal.vigla.city/strapi/api/carrusel/?populate%5Bcarrusel%5D%5Bpopulate%5D=image`,
                {
                    method: 'GET',
                    headers: {
                        Authorization:
                            'Bearer ab2f3b034c50a077efb61793bbd63464710b149a1f6f241e74caeef6b9c4243cde00c3d542ee5d20fa0a1331770187595612b4abed138781ff4abf9da763ba53ee6585c5b21809c824e6f96c5395abb3ae029a0adcabd539de59b7572a3da1c62214f73d2ce2eafae5e8ea61daa562d183c21ffd1c8244cedea683d071a41c65',
                    },
                }
            )

            if (response.ok) {
                const result: CarruselAPI = await response.json()

                setData(
                    result.data.attributes.carrusel.map(
                        ({ image }: CarruselImage) => {
                            const imgId = image.data.id
                            const { url, width, height } = image.data.attributes

                            return (
                                <Image
                                    key={imgId}
                                    src={`http://tribunal.vigla.city/strapi${url}`}
                                    alt={'imagen'}
                                    width={width}
                                    height={height}
                                />
                            )
                        }
                    )
                )
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchStrapi()
    }, [])

    return data
}

export default useCarrusel
