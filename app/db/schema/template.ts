import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'
import { block } from './block'

export const templates = sqliteTable(
    'templates',
    {
        id: text('id').primaryKey().notNull(),
        name: text('name').notNull(),
        description: text('description'),
        createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
            sql`(strftime('%s', 'now'))`
        ),
        updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).default(
            sql`(strftime('%s', 'now'))`
        ),
    },
    (table) => [index('template_id_idx').on(table.id)]
)

export const templatesRelations = relations(templates, ({ many }) => ({
    blocks: many(block),
}))
