import { Button, DownloadButton, Heading, Text } from '@/ui-components'
import { useState } from 'react'

const Elementos = () => {
    const [isShow, setIsShow] = useState(false)

    return (
        <div>
            <Button onClick={() => setIsShow(!isShow)}>hola</Button>
            <DownloadButton label='Descargar' fileData='' fileName='' />
            <Heading type='h1'>Tribunal de la ciutat</Heading>
            <Heading type='h2'>Tribunal de la ciutat</Heading>
            <Heading type='h3'>Tribunal de la ciutat</Heading>
            <Heading type='h4'>Tribunal de la ciutat</Heading>
            <Heading type='h5'>Tribunal de la ciutat</Heading>
            <Text type='normal'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                blandit sagittis lorem vel imperdiet. Nullam ultrices
                scelerisque ipsum id rhoncus. Proin pulvinar orci eu lacus
                cursus semper
            </Text>
            <Text type='sangria'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                blandit sagittis lorem vel imperdiet. Nullam ultrices
                scelerisque ipsum id rhoncus. Proin pulvinar orci eu lacus
                cursus semper
            </Text>
            <Text type='pequeno'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                blandit sagittis lorem vel imperdiet. Nullam ultrices
                scelerisque ipsum id rhoncus. Proin pulvinar orci eu lacus
                cursus semper
            </Text>
        </div>
    )
}

export default Elementos
