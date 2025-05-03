export interface IEditorBlockItem {
    type: 'TEXT' | 'FILL' | 'CHOICE'
    content?: string
    answer?: string
    options?: string[]
    spaces?: {
        leading: boolean
        trailing: boolean
    }
}
