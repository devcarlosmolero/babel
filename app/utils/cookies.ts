import { createCookie } from '@remix-run/cloudflare'
import { USER_COOKIE_KEY } from '~/consts'

export const userCookie = createCookie(USER_COOKIE_KEY, {
    maxAge: 604_800,
})
