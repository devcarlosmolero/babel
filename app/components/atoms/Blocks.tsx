import { Fragment } from 'react/jsx-runtime'
import { IEditorBlockItem } from '~/types/editor'

function Text({ block }: { block: IEditorBlockItem }) {
    return (
        <p
            dangerouslySetInnerHTML={{
                __html: block.content?.replaceAll(' ', '&nbsp;') ?? '',
            }}
            className="text-lg text-tertiary"
        />
    )
}

function Fill({ block }: { block: IEditorBlockItem }) {
    const width = block?.answer ? `${block.answer.length * 25}px` : '120px'
    return (
        <Fragment>
            {block?.spaces?.leading && <>&nbsp;</>}
            <input
                type="text"
                style={{ width: width }}
                className={`h-[20px] border-b border-tertiary bg-transparent text-center text-lg font-bold italic focus:outline-0`}
            />
            {block?.spaces?.trailing && <>&nbsp;</>}
        </Fragment>
    )
}

function Choice({ block }: { block: IEditorBlockItem }) {
    return (
        <div className="flex items-center gap-1">
            {block?.spaces?.leading && <>&nbsp;</>}
            {block.options?.map((option, i) => {
                return (
                    <button
                        className="flex h-[25px] max-h-[36px] min-w-[36px] items-center justify-center rounded-full border border-border px-3 text-sm text-tertiary hover:border-primary hover:bg-primary/10 hover:font-bold hover:text-primary"
                        key={i}
                    >
                        {option}
                    </button>
                )
            })}
            {block?.spaces?.trailing && <>&nbsp;</>}
        </div>
    )
}

const Blocks = {
    Text,
    Fill,
    Choice,
}

export default Blocks
