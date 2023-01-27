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
                            'Bearer bec529958f1f94ce19e763a77254d2f65c800b47ab08bd256a5c771694b03e4dff0361aa6c54babb0faa4835c9c12e053409604d335b502021ca8576009a3d6ef7217a55fa6f2533b06e1bd76e1f16caf58c02e5eb45c37946e053ca110c403b449675f8ab344731ba3c7da8fab3324a1d353ca36eee971c20f46409139d2e3d',
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
