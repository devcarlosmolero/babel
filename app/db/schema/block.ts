import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { sql, relations } from 'drizzle-orm'
import { templates } from './template'

export const blocks = sqliteTable(
    'blocks',
    {
        id: text('id').primaryKey().notNull(),
        templateId: text('templateId')
            .notNull()
            .references(() => templates.id, { onDelete: 'cascade' }),
        type: text('type', { enum: ['TEXT', 'FILL', 'CHOICE'] }).notNull(),
        content: text('content'),
        answer: text('answer'),
        options: text('options'),
        hasLeadingSpace: integer('hasLeadingSpace', {
            mode: 'boolean',
        }).default(sql`0`),
        hasTrailingSpace: integer('hasTrailingSpace', {
            mode: 'boolean',
        }).default(sql`0`),
        createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
            sql`(strftime('%s', 'now'))`
        ),
        updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).default(
            sql`(strftime('%s', 'now'))`
        ),
    },
    (table) => [
        index('block_id_idx').on(table.id),
        index('block_template_idx').on(table.templateId),
    ]
)

export const blocksRelations = relations(blocks, ({ one }) => ({
    template: one(templates, {
        fields: [blocks.templateId],
        references: [templates.id],
    }),
}))
