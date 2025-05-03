import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
        sql`(strftime('%s', 'now'))`
    ),
    updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).default(
        sql`(strftime('%s', 'now'))`
    ),
})
