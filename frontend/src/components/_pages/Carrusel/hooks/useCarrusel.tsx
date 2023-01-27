import Image from 'next/image'
import { useEffect, useState } from 'react'
import CarruselAPI, { CarruselImage } from '../types'

const useCarrusel = () => {
    const [data, setData] = useState<JSX.Element[] | null>(null)

    const fetchStrapi = async () => {
        try {
            const response = await fetch(
                `${process.env.HOST_STRAPI}/api/carrusel/?populate%5Bcarrusel%5D%5Bpopulate%5D=image`,
                {
                    method: 'GET',
                    headers: {
                        Authorization:
                            'Bearer c2e5d9331e4aaa09cd34fef09cf7b13978cb5fb76392e3452632026d3e0b49ac480b913898279a5b56abead8484f5b345fbd47c7eb7cc117c389bc57f80c73445350a9619a05736a0254e44fdb7fe388a39366188d4f961994d4551f663f6dd6ce4445befd4aa59df0432c0bf12f04eccb1000a4ed2a9f5347d1383592cdb1a6',
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
                                    src={`${process.env.HOST_STRAPI}${url}`}
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
