import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { IEditorBlockItem } from '~/types/editor'
import EditorUtils from '~/utils/editor'

interface EditorContextType {
    isSaving: boolean
    blocks: IEditorBlockItem[][]
    cachedOriginalText: string
    isPreview: boolean
    animatePreviewLines: boolean
    name: string
    description: string
    editorRef: React.RefObject<HTMLTextAreaElement>

    setIsSaving: (value: boolean) => void
    setBlocks: (blocks: IEditorBlockItem[][]) => void
    setCachedOriginalText: (text: string) => void
    setIsPreview: (isPreview: boolean) => void
    setAnimatePreviewLines: (animate: boolean) => void
    setName: (name: string) => void
    setDescription: (description: string) => void
    handlePreview: (checked: boolean) => void
    handlePublish: () => void
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({ children }: { children: ReactNode }) {
    const [isSaving, setIsSaving] = useState(false)
    const [blocks, setBlocks] = useState<IEditorBlockItem[][]>([])
    const [cachedOriginalText, setCachedOriginalText] = useState('')
    const [isPreview, setIsPreview] = useState(false)
    const [animatePreviewLines, setAnimatePreviewLines] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const editorRef = useRef<HTMLTextAreaElement>(null)
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const editor = editorRef.current
        if (!editor) return

        editorRef.current.value = cachedOriginalText

        const handleInput = () => {
            setIsSaving(true)

            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }

            debounceTimerRef.current = setTimeout(() => {
                setIsSaving(false)
            }, 300)
        }

        editor.addEventListener('input', handleInput)

        return () => {
            editor.removeEventListener('input', handleInput)
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [editorRef.current, cachedOriginalText])

    useEffect(() => {
        if (isPreview) {
            setTimeout(() => {
                setAnimatePreviewLines(true)
            }, 100)
        } else {
            setAnimatePreviewLines(false)
        }
    }, [isPreview])

    function handlePublish() {
        console.log(blocks, name, description)
    }

    function handlePreview(checked: boolean) {
        if (editorRef?.current && checked) {
            setCachedOriginalText(editorRef.current.value)
            const newBlocks = EditorUtils.getBlocks(editorRef)
            setBlocks(newBlocks)
        }
        setIsPreview(checked)
    }

    const value = {
        isSaving,
        blocks,
        cachedOriginalText,
        isPreview,
        animatePreviewLines,
        name,
        description,
        editorRef,

        setIsSaving,
        setBlocks,
        setCachedOriginalText,
        setIsPreview,
        setAnimatePreviewLines,
        setName,
        setDescription,
        handlePreview,
        handlePublish,
    }

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    )
}

export function useEditor() {
    const context = useContext(EditorContext)
    if (context === undefined) {
        throw new Error('useEditor must be used within an EditorProvider')
    }
    return context
}
