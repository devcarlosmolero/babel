import { ActionFunctionArgs } from '@remix-run/cloudflare'
import BlockRepository from '~/repositories/BlockRepository'
import TemplateRepository from '~/repositories/TemplateRepository'
import { IEditorBlockItem } from '~/types/editor'
import ServerUtils from '~/utils/server'

export async function action({ request, context }: ActionFunctionArgs) {
    const templateId = crypto.randomUUID()

    try {
        const payload = (await request.json()) as {
            name: string
            description: string
            blocks: IEditorBlockItem[]
        }

        const blocks = payload.blocks.map((block) => {
            const blockId = crypto.randomUUID()
            if (block.type === 'CHOICE' && block.options) {
                const shuffledOptions = [...block.options]
                for (let i = shuffledOptions.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1))
                    ;[shuffledOptions[i], shuffledOptions[j]] = [
                        shuffledOptions[j],
                        shuffledOptions[i],
                    ]
                }

                return {
                    ...block,
                    id: blockId,
                    templateId,
                    options: JSON.stringify(shuffledOptions),
                }
            }

            return {
                ...block,
                id: blockId,
                templateId,
            }
        })

        await TemplateRepository.create(
            {
                id: templateId,
                name: payload.name,
                description: payload.description,
            },
            context
        )

        await BlockRepository.createMany({ items: blocks }, context)

        return {}
    } catch (error) {
        await TemplateRepository.destroy(templateId, context)
        console.error('/templates/create', error)
        return ServerUtils.redirectWithToast(
            '/',
            `Unknown error: ${error}`,
            'error'
        )
    }
}
