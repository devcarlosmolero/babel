import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import jwt from '@tsndr/cloudflare-worker-jwt'
import { userCookie } from './utils/cookies'

export async function getAuthUser(request: LoaderFunctionArgs['request']) {
    const jwtCookieValue = await userCookie.parse(request.headers.get('Cookie'))
    await jwt.verify(jwtCookieValue, 'secret')
    const jwtCookieDecoded = jwt.decode(jwtCookieValue)
    return jwtCookieDecoded.payload as any
}

const Middlewares = {
    getAuthUser,
}
export default Middlewares
