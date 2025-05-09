import { useEditor } from '~/contexts/EditorContext'
import { cn } from '~/lib/utils'

export default function Editor() {
    const { editorRef, blocks } = useEditor()

    const isEmpty =
        (editorRef.current?.value === '' || !editorRef.current?.value) &&
        blocks.length === 0

    return (
        <textarea
            ref={editorRef}
            style={{
                resize: 'none',
                lineHeight: isEmpty ? '1.5rem' : '2.96rem',
            }}
            placeholder="Write your assignment, if you feel lost press ⌘ + C to display the available commands..."
            className={cn(
                'h-full w-full overflow-y-auto whitespace-nowrap p-6 pb-28 font-secondary text-tertiary focus:outline-none md:whitespace-normal md:rounded-t-lg md:border md:border-border md:bg-white/80 md:p-10 md:pb-28 md:text-lg md:shadow-sm md:shadow-border',
                isEmpty && 'whitespace-normal'
            )}
        ></textarea>
    )
}
