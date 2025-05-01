import { redirect } from '@remix-run/cloudflare'
import chalk from 'chalk'

function redirectWithToast(
    pathname: string,
    message: string,
    type: 'success' | 'error',
    headers = {},
    alreadyHasParams = false
) {
    const to = `${pathname}${alreadyHasParams ? '&' : '?'}tm=${encodeURIComponent(message)}&tt=${encodeURIComponent(type)}`
    console.log(chalk.yellow(`Redirecting to ${to}`))

    return redirect(to, { headers })
}

function getCacheControlHeader(
    duration: 'THREE_DAYS' | 'ONE_WEEK' | 'ONE_MONTH'
): string {
    let maxAge: number

    switch (duration) {
        case 'THREE_DAYS':
            maxAge = 60 * 60 * 24 * 3
            break
        case 'ONE_WEEK':
            maxAge = 60 * 60 * 24 * 7
            break
        case 'ONE_MONTH':
            maxAge = 60 * 60 * 24 * 30
            break
    }

    return `public, max-age=${maxAge}, s-maxage=${maxAge}`
}

const ServerUtils = {
    getCacheControlHeader,
    redirectWithToast,
}
export default ServerUtils
