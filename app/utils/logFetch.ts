import chalk from 'chalk'

export default function logFetch(url: string, options?: RequestInit) {
    console.log('\n')
    console.log(chalk.magenta('[Url]:', url))
    console.log(chalk.magenta('[Body]:', options?.body))
    console.log(chalk.magenta('[Headers]:', JSON.stringify(options?.headers)))

    return fetch(url, options)
}
