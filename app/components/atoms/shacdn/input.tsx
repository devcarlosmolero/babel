import { ReactNode } from 'react'

export default function Input({
    name,
    type = 'text',
    placeholder,
    icon,
    iconPlacement = 'left',
}: React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: ReactNode
    iconPlacement?: 'left' | 'right'
}) {
    return (
        <div className="flex h-[44px] w-full items-center rounded-md border border-border bg-white/90 pl-3 placeholder:text-tertiary/30 focus:outline-primary/10">
            {icon && iconPlacement === 'left' && (
                <div className="mr-2 flex h-full items-center justify-center text-tertiary/30">
                    {icon}
                </div>
            )}
            <input
                className="h-full w-full bg-transparent focus:outline-none"
                name={name}
                type={type}
                placeholder={placeholder}
            />
            {icon && iconPlacement === 'right' && (
                <div className="ml-2 flex h-full items-center justify-center text-tertiary/30">
                    {icon}
                </div>
            )}
        </div>
    )
}
