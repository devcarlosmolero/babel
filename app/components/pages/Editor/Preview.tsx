import Blocks from '~/components/atoms/Blocks'
import { useEditor } from '~/contexts/EditorContext'
import { cn } from '~/lib/utils'
import { IEditorBlockItem } from '~/types/editor'

export default function Preview() {
    const { blocks, animatePreviewLines } = useEditor()

    function renderBlock(block: IEditorBlockItem) {
        switch (block.type) {
            case 'TEXT':
                return (
                    <Blocks.Text
                        key={`block-${block.row}-${block.position}`}
                        block={block}
                    />
                )
            case 'FILL':
                return (
                    <Blocks.Fill
                        key={`block-${block.row}-${block.position}`}
                        block={block}
                    />
                )
            case 'CHOICE':
                return (
                    <Blocks.Choice
                        key={`block-${block.row}-${block.position}`}
                        block={block}
                    />
                )
        }
    }
    const groupedBlocks = blocks.reduce<Record<number, IEditorBlockItem[]>>(
        (acc, block) => {
            if (!acc[block.row]) {
                acc[block.row] = []
            }
            acc[block.row].push(block)
            return acc
        },
        {}
    )

    const rowsArray = Object.entries(groupedBlocks).map(([row, rowBlocks]) => ({
        row: parseInt(row),
        blocks: rowBlocks,
    }))

    return (
        <div className="h-full w-full overflow-auto rounded-t-lg border border-border bg-white/80 p-6 pb-28 font-secondary text-tertiary shadow-sm shadow-border focus:outline-none md:p-10 md:pb-28 md:text-lg">
            {blocks.length > 0 && (
                <div className="flex flex-col gap-5">
                    {rowsArray.map(({ row, blocks: rowBlocks }) => (
                        <div
                            key={`line-${row}`}
                            style={{
                                transitionDelay: `${row * 20}ms`,
                            }}
                            className={cn(
                                'flex w-max items-center gap-0 pr-10 transition-all md:w-auto',
                                animatePreviewLines
                                    ? 'opacity-1 translate-y-0'
                                    : 'translate-y-10 opacity-0'
                            )}
                        >
                            {rowBlocks.map((block) => renderBlock(block))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
