import { Fragment, ReactNode, forwardRef } from 'react'
import cn from 'classnames'
import Spinner from '../molecules/Spinner'
import { Link } from '@remix-run/react'
import { RemixLinkProps } from '@remix-run/react/dist/components'

interface ButtonProps {
    children: ReactNode | string
    variant?: 'primary' | 'outline'
    to?: string
    asLink?: boolean
    isLoading?: boolean
    isDisabled?: boolean
    hasIcon?: boolean
    className?: string
    props?:
        | React.ForwardRefExoticComponent<
              RemixLinkProps & React.RefAttributes<HTMLAnchorElement>
          >
        | React.LinkHTMLAttributes<HTMLLinkElement>
        | React.ButtonHTMLAttributes<HTMLButtonElement>
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            to,
            asLink = false,
            isLoading = false,
            hasIcon = false,
            isDisabled = false,
            className,
            props,
            ...restProps
        },
        ref
    ) => {
        function getVariantClassname() {
            if (isDisabled) {
                return 'bg-border pointer-events-none text-tertiary/30'
            }

            switch (variant) {
                case 'primary':
                    return 'bg-primary text-white font-bold hover:bg-primary/90'
                case 'outline':
                    return 'bg-white text-tertiary border border-border hover:text-tertiary-90'
            }
        }

        return (
            <Fragment>
                {!asLink && (
                    <button
                        className={cn(
                            'font-primary transition-all duration-300',
                            getVariantClassname(),
                            className,
                            hasIcon && 'flex items-center gap-x-3',
                            'w-fit rounded-full px-5 py-2'
                        )}
                        ref={ref as React.RefObject<HTMLButtonElement>}
                        disabled={isDisabled}
                        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                        {...restProps}
                    >
                        {isLoading && <Spinner />}
                        {!isLoading && <Fragment>{children}</Fragment>}
                    </button>
                )}
                {asLink && (
                    <Link
                        to={to ?? ''}
                        className={cn(
                            'font-primary transition-all duration-300',
                            getVariantClassname(),
                            className,
                            hasIcon && 'flex items-center gap-x-3',
                            'w-fit rounded-full px-5 py-2'
                        )}
                        ref={ref as React.RefObject<HTMLAnchorElement>}
                        {...(props as any)}
                        {...restProps}
                    >
                        {isLoading && <Spinner />}
                        {!isLoading && <Fragment>{children}</Fragment>}
                    </Link>
                )}
            </Fragment>
        )
    }
)

Button.displayName = 'Button'

export default Button
