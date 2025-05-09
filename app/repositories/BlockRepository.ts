import { AppLoadContext } from '@remix-run/cloudflare'
import { eq } from 'drizzle-orm'
import { db } from '~/db/drizzle'
import { blocks } from '~/db/schema/block'
import { IEditorBlockItem } from '~/types/editor'

async function createMany(
    { items }: { items: IEditorBlockItem[] },
    context: AppLoadContext
) {
    await db(context.cloudflare.env.DB)
        .insert(blocks)
        .values(items as any)
}

async function destroy(id: string, context: AppLoadContext) {
    await db(context.cloudflare.env.DB).delete(blocks).where(eq(blocks.id, id))
}

const BlockRepository = {
    createMany,
    destroy,
}

export default BlockRepository
