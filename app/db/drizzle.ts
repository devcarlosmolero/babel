import { DefaultLogger, LogWriter } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import chalk from 'chalk'

class DrizzleLogger implements LogWriter {
    write(message: string) {
        console.log(chalk.magenta(`[drizzle]: ${message}`))
    }
}
const logger = new DefaultLogger({ writer: new DrizzleLogger() })

export const db = (database: D1Database) => drizzle(database, { logger })
