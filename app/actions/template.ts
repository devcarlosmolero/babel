import { IEditorBlockItem } from '~/types/editor'

function create({
    name,
    description,
    blocks,
}: {
    name: string
    description: string
    blocks: IEditorBlockItem[]
}) {
    return fetch('/api/templates/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            description,
            blocks,
        }),
    })
}

const Templates = {
    create,
}

export default Templates
