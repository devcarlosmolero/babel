import { Cog, Command } from 'lucide-react'
import { useRef } from 'react'
import Button from '~/components/atoms/Button'
import { Switch } from '~/components/atoms/shacdn/switch'
import Spinner from '~/components/molecules/Spinner'
import Page from '~/components/templates/Page'
import EditorUtils from '~/utils/editor'

export async function loader() {
    return {}
}

export default function IndexPage() {
    const editorRef = useRef<HTMLTextAreaElement>(null)

    function handlePublish() {
        console.log(EditorUtils.getBlocks(editorRef))
    }

    function handlePreview() {
        console.log(EditorUtils.getBlocks(editorRef))
    }

    return (
        <Page className="h-screen !pb-0">
            {/* Editor */}
            <div className="relative h-full overflow-hidden">
                <textarea
                    ref={editorRef}
                    style={{ resize: 'none' }}
                    placeholder="Write your assignment, if you feel lost press ⌘ + C to display the available commands..."
                    className="border-border shadow-border text-tertiary h-full w-full rounded-t-2xl border bg-white/80 pl-10 pt-10 font-secondary text-lg shadow-sm focus:outline-none"
                ></textarea>
                <div className="shadow-border absolute bottom-0 left-0 mb-10 ml-10 flex items-center gap-4 rounded-full bg-white/10 px-4 py-2 shadow backdrop-blur">
                    <div className="flex items-center space-x-2">
                        <Switch id="preview-mode" />
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
                            className="flex h-[42px] max-h-[42px] w-[42px] max-w-[42px] items-center justify-center !bg-transparent !px-0 !py-0"
                        >
                            <Cog strokeWidth={'1'} className="size-5" />
                        </Button>
                        <Button
                            variant="outline"
                            className="flex h-[42px] max-h-[42px] w-[42px] max-w-[42px] items-center justify-center !bg-transparent !px-0 !py-0"
                        >
                            <Command strokeWidth={'1'} className="size-5" />
                        </Button>
                    </div>
                    <Spinner />
                    <Button
                        props={{ onClick: handlePreview }}
                        variant="primary"
                    >
                        Publish
                    </Button>
                </div>
            </div>
        </Page>
    )
}
