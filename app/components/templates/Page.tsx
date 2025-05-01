import React from 'react'

interface PageProps {
    children: React.ReactNode
    className?: string
}

const Page: React.FC<PageProps> = ({ children, className = '' }) => {
    return <div className={className}>{children}</div>
}

export default Page
