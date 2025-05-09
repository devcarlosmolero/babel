import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable(
    'users',
    {
        id: text('id').primaryKey().notNull(),
        name: text('name').notNull(),
        email: text('email').unique().notNull(),
        password: text('password'),
        createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
            sql`(strftime('%s', 'now'))`
        ),
        updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).default(
            sql`(strftime('%s', 'now'))`
        ),
    },
    (table) => [index('user_id_idx').on(table.id)]
)
