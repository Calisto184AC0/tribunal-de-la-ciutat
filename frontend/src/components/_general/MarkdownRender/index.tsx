import textsStyles from '@/assets/styles/texts.module.scss'
import { Heading, Text } from '@/components/_ui'
import ReactMarkdown from 'react-markdown'
import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

interface MarkdownRenderProps {
    source: string
    components?:
        | Partial<
              Omit<NormalComponents, keyof SpecialComponents> &
                  SpecialComponents
          >
        | undefined
}

const MarkdownRender = ({ source, components }: MarkdownRenderProps) => {
    return (
        <ReactMarkdown
            components={{
                h1: ({ node, ...props }) => (
                    <Heading type='h3' tag='h1' {...props} />
                ),
                em: ({ node, ...props }) => <span {...props} />,
                p: ({ node, ...props }) => <Text type='normal' {...props} />,
                ul: ({ children }) => (
                    <ul className={textsStyles.normal}>{children}</ul>
                ),
                li: ({ children }) => (
                    <li
                        style={{
                            marginLeft: '1rem',
                            listStyleType: 'square',
                        }}
                    >
                        {children}
                    </li>
                ),
                ...components,
            }}
        >
            {source}
        </ReactMarkdown>
    )
}

export default MarkdownRender
