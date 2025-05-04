import { Fragment } from 'react'
import EditorModals from './modals'
import { useEditor } from '~/contexts/EditorContext'
import Spinner from '~/components/molecules/Spinner'
import { Eye } from 'lucide-react'
import Button from '~/components/atoms/Button'
import { cn } from '~/lib/utils'

function ContentDesktop() {
    const {
        isSaving,
        blocks,
        editorRef,
        isPreview,
        handlePreview,
        handlePublish,
    } = useEditor()

    return (
        <Fragment>
            <div className="flex items-center gap-2">
                <Button
                    props={{ onClick: () => handlePreview(!isPreview) }}
                    variant={isPreview ? 'primary' : 'outline'}
                    className={cn(
                        'flex h-[42px] max-h-[42px] w-[42px] min-w-[42px] max-w-[42px] items-center justify-center !px-0 !py-0'
                    )}
                >
                    <Eye
                        strokeWidth={isPreview ? '2' : '1'}
                        className="size-5"
                    />
                </Button>
                <EditorModals.SettingsModal />
                <EditorModals.CommandsModal />
                <Button
                    props={{ onClick: handlePublish }}
                    variant="primary"
                    className={cn(isSaving && '!bg-primary/10', 'min-w-[90px]')}
                    isDisabled={
                        isSaving ||
                        ((editorRef.current?.value === '' ||
                            !editorRef.current?.value) &&
                            blocks.length === 0)
                    }
                >
                    {isSaving ? <Spinner /> : 'Publish'}
                </Button>
            </div>
        </Fragment>
    )
}

function ActionBar() {
    return (
        <div className="absolute bottom-0 left-0 right-0 mx-auto mb-10 flex w-fit max-w-full items-center justify-center gap-4 rounded-full bg-white/80 px-4 py-2 shadow shadow-border backdrop-blur md:mx-6 md:mb-10 md:ml-10 md:justify-start">
            <ContentDesktop />
        </div>
    )
}

export default ActionBar
