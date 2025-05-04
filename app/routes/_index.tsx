import EditorPage from '~/components/pages/Editor'
import Page from '~/components/templates/Page'
import { EditorProvider, useEditor } from '~/contexts/EditorContext'

export async function loader() {
    return {}
}

function IndexPageContent() {
    const { isPreview } = useEditor()

    return (
        <Page className="h-screen !pb-0">
            <div className="relative h-full overflow-hidden">
                {!isPreview ? <EditorPage.Editor /> : <EditorPage.Preview />}
                <EditorPage.ActionBar />
            </div>
        </Page>
    )
}

export default function IndexPage() {
    return (
        <EditorProvider>
            <IndexPageContent />
        </EditorProvider>
    )
}
