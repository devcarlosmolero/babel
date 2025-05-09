import { ReactNode } from 'react'
import Container from './Container'
import PageInner from './PageInner'

export default function Page({
    children,
    containerClassName,
    className,
}: {
    children: ReactNode | ReactNode[]
    containerClassName?: string
    className?: string
}) {
    return (
        <div>
            <Container className={containerClassName}>
                <PageInner className={className}>{children}</PageInner>
            </Container>
        </div>
    )
}
