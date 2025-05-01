import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
//@ts-expect-error idk
import stylesheet from '~/tailwind.css?url'

export async function loader({ request }: LoaderFunctionArgs) {
    return {
        url: request.url,
        pathname: new URL(request.url).pathname ?? 'index',
        tt: new URL(request.url).searchParams.get('tt'),
        tm: new URL(request.url).searchParams.get('tm'),
    }
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
    const { url, tt, tm } = useLoaderData<typeof loader>()

    useEffect(() => {
        if (tt && tm) {
            //@ts-expect-error idk
            toast[tt](tm)
        }
    }, [tt, tm])

    return (
        <html lang="es">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="canonical" href={url} />
                <meta property="og:url" content={url} />
                <meta property="og:locale" content="es" />

                <Meta />
                <Links />
            </head>
            <body className="bg-white">
                <main>
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                </main>
                <ToastContainer
                    position="bottom-right"
                    limit={3}
                    stacked
                    theme="colored"
                />
            </body>
        </html>
    )
}
