export interface IEditorBlockItem {
    id?: string
    templateId?: string
    type: 'TEXT' | 'FILL' | 'CHOICE'
    content?: string
    answer?: string
    options?: string[]
    row: number
    position: number
    spaces?: {
        leading: boolean
        trailing: boolean
    }
}
