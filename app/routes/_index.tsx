import { LoaderFunctionArgs, redirect } from '@remix-run/cloudflare'
import { Fragment } from 'react/jsx-runtime'
import EditorPage from '~/components/pages/Editor'
import Page from '~/components/templates/Page'
import { EditorProvider, useEditor } from '~/contexts/EditorContext'
import Middlewares from '~/middlewares'

export async function loader({ request }: LoaderFunctionArgs) {
    const authUser = await Middlewares.getAuthUser(request)
    if (!authUser) {
        return redirect('/')
    }

    return {
        authUser,
    }
}

function IndexPageContent() {
    const { isPreview } = useEditor()

    return (
        <Fragment>
            <Page
                containerClassName={'!px-0 md:px-4'}
                className="h-screen !px-0 !py-0 !pb-0 md:!pt-6"
            >
                <div className="relative h-full overflow-hidden">
                    {!isPreview ? (
                        <EditorPage.Editor />
                    ) : (
                        <EditorPage.Preview />
                    )}
                    <EditorPage.ActionBar />
                </div>
            </Page>
        </Fragment>
    )
}

export default function IndexPage() {
    return (
        <EditorProvider>
            <IndexPageContent />
        </EditorProvider>
    )
}
