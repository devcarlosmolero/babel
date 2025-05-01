import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    lastName: text('lastName').notNull(),
    email: text('email').unique().notNull(),
    inviteCode: text('inviteCode').unique().notNull(),
    spaceId: text('spaceId').unique(),
    createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
        sql`(strftime('%s', 'now'))`
    ),
    updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).default(
        sql`(strftime('%s', 'now'))`
    ),
})
