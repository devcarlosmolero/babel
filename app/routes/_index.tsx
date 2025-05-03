import { Check, Cog, Command } from 'lucide-react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Blocks from '~/components/atoms/Blocks'
import Button from '~/components/atoms/Button'
import { Switch } from '~/components/atoms/shacdn/switch'
import Spinner from '~/components/molecules/Spinner'
import Page from '~/components/templates/Page'
import { cn } from '~/lib/utils'
import { IEditorBlockItem } from '~/types/editor'
import EditorUtils from '~/utils/editor'

export async function loader() {
    return {}
}

export default function IndexPage() {
    const [isSaving, setIsSaving] = useState(false)
    const [blocks, setBlocks] = useState<IEditorBlockItem[][]>([])
    const [cachedOriginalText, setCachedOriginalText] = useState('')
    const [isPreview, setIsPreview] = useState(false)
    const [animatePreviewLines, setAnimatePreviewLines] = useState(false)
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
    }, [editorRef.current])

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
        console.log('Publish...')
    }

    function handlePreview(checked: boolean) {
        if (editorRef?.current && checked) {
            setCachedOriginalText(editorRef.current.value)
            const newBlocks = EditorUtils.getBlocks(editorRef)
            setBlocks(newBlocks)
        }
        setIsPreview(checked)
    }

    function renderBlock(block: IEditorBlockItem, i: number, j: number) {
        switch (block.type) {
            case 'TEXT':
                return <Blocks.Text key={`line-${i}-${j}`} block={block} />
            case 'FILL':
                return <Blocks.Fill key={`line-${i}-${j}`} block={block} />
            case 'CHOICE':
                return <Blocks.Choice key={`line-${i}-${j}`} block={block} />
        }
    }

    return (
        <Page className="h-screen !pb-0">
            <div className="relative h-full overflow-hidden">
                {!isPreview ? (
                    <textarea
                        ref={editorRef}
                        style={{
                            resize: 'none',
                            lineHeight: '2.96rem',
                        }}
                        placeholder="Write your assignment, if you feel lost press ⌘ + C to display the available commands..."
                        className="h-full w-full overflow-y-auto rounded-t-2xl border border-border bg-white/80 pb-28 pl-10 pt-10 font-secondary text-lg text-tertiary shadow-sm shadow-border focus:outline-none"
                    ></textarea>
                ) : (
                    <div className="h-full w-full overflow-y-auto rounded-t-2xl border border-border bg-white/80 pb-28 pl-10 pt-10 font-secondary text-lg text-tertiary shadow-sm shadow-border focus:outline-none">
                        {blocks.length > 0 && (
                            <div className="flex flex-col gap-0">
                                {blocks.map((block, i) => (
                                    <div
                                        key={`line-${i}`}
                                        style={{
                                            transitionDelay: `${i * 20}ms`,
                                        }}
                                        className={cn(
                                            'flex items-center gap-0 transition-all',
                                            animatePreviewLines
                                                ? 'opacity-1 translate-y-0'
                                                : 'translate-y-10 opacity-0'
                                        )}
                                    >
                                        {block.map((block, j) =>
                                            renderBlock(block, i, j)
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div className="absolute bottom-0 left-0 mb-10 ml-10 flex items-center gap-4 rounded-full bg-white/60 px-4 py-2 shadow shadow-border backdrop-blur">
                    <div className="flex items-center space-x-2">
                        <Switch
                            onCheckedChange={handlePreview}
                            id="preview-mode"
                        />
                        <label
                            htmlFor="preview-mode"
                            className="font-primary font-bold"
                        >
                            Preview
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="group flex h-[42px] max-h-[42px] w-[42px] min-w-[42px] max-w-[42px] items-center justify-center !bg-transparent !px-0 !py-0"
                        >
                            <Cog
                                strokeWidth={'1'}
                                className="size-5 transition-all duration-500 group-hover:rotate-45"
                            />
                        </Button>
                        <Button
                            variant="outline"
                            className="group flex h-[42px] max-h-[42px] w-[42px] min-w-[42px] max-w-[42px] items-center justify-center !bg-transparent !px-0 !py-0"
                        >
                            <Command
                                strokeWidth={'1'}
                                className="size-5 transition-all duration-500 group-hover:rotate-45"
                            />
                        </Button>
                    </div>
                    {isSaving ? (
                        <Fragment>
                            <Spinner />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Check className="size-6 text-success" />
                        </Fragment>
                    )}
                    <Button
                        props={{ onClick: handlePublish }}
                        variant="primary"
                    >
                        Publish
                    </Button>
                </div>
            </div>
        </Page>
    )
}
