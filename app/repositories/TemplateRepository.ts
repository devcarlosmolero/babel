import { AppLoadContext } from '@remix-run/cloudflare'
import { eq } from 'drizzle-orm'
import { db } from '~/db/drizzle'
import { templates } from '~/db/schema/template'

async function create(
    {
        id,
        name,
        description,
    }: { id: string; name: string; description: string },
    context: AppLoadContext
) {
    await db(context.cloudflare.env.DB).insert(templates).values({
        id,
        name,
        description,
    })
}

async function destroy(id: string, context: AppLoadContext) {
    await db(context.cloudflare.env.DB)
        .delete(templates)
        .where(eq(templates.id, id))
}

const TemplateRepository = {
    create,
    destroy,
}

export default TemplateRepository
