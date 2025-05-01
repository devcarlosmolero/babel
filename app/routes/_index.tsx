import Page from '~/components/templates/Page'

export async function loader() {
    return {}
}

export default function IndexPage() {
    return (
        <Page className="min-h-screen">
            <div>
                {/* Headings */}
                <div></div>
                {/* Editor */}
                <div>
                    {/* Preview Toggle */}
                    <div></div>
                    {/* Editor */}
                    <div>
                        {/* Action bar */}
                        <div></div>
                    </div>
                </div>
            </div>
        </Page>
    )
}
