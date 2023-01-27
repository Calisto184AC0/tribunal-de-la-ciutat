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
                            'Bearer 776aedf04518019ca4c83b230efbb451ce469f3ea52566ccef3cc0b9ec92668dc1e586bbec1c915262727242be7de57b078ec3ed1deeadb3706d23f59e52d8c3e55b8e232a2047b7cc55218477c9da63e4db4d700a85b7aa59c087bb75dd5d7e3627f9bf5d20d5d20b2d51be382704a7e48a36db333b3f0ed34891081a94b170',
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
