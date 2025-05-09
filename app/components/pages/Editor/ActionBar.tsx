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
                        'flex h-[34px] max-h-[34px] w-[34px] min-w-[34px] max-w-[34px] items-center justify-center !px-0 !py-0 md:h-[42px] md:max-h-[42px] md:w-[42px] md:min-w-[42px] md:max-w-[42px]'
                    )}
                >
                    <Eye
                        strokeWidth={isPreview ? '2' : '1'}
                        className="size-4 md:size-5"
                    />
                </Button>
                <EditorModals.SettingsModal />
                <EditorModals.CommandsModal />
                <Button
                    props={{ onClick: handlePublish }}
                    variant="primary"
                    className={cn(
                        isSaving && '!bg-primary/10',
                        'flex h-[34px] min-w-[90px] items-center justify-center py-1 md:h-[42px] md:py-2'
                    )}
                    isDisabled={
                        isSaving ||
                        ((editorRef.current?.value === '' ||
                            !editorRef.current?.value) &&
                            blocks.length === 0)
                    }
                >
                    {isSaving ? (
                        <Spinner size="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                        'Publish'
                    )}
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
