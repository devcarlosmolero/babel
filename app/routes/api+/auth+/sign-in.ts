import { ActionFunctionArgs } from '@remix-run/cloudflare'
import jwt from '@tsndr/cloudflare-worker-jwt'
import UserRepository from '~/repositories/UserRepository'
import { userCookie } from '~/utils/cookies'
import ServerUtils from '~/utils/server'
import { compareSync } from 'bcrypt-edge'
import Mappers from '~/utils/mappers'

export async function action({ request, context }: ActionFunctionArgs) {
    try {
        const formData = (await request.formData()) as any
        const email = formData.get('email')
        const password = formData.get('password')

        const user = await UserRepository.getOneByEmail(email, context)
        const unhashedPassword = password
        const hashedPassword = user?.password ?? ''

        const match = compareSync(unhashedPassword, hashedPassword)

        console.log('after compare', match)

        if (!user || !match) {
            return ServerUtils.redirectWithToast(
                '/sign-in',
                'Invalid credentials',
                'error'
            )
        }

        const token = await jwt.sign(
            Mappers.fromD1UserToAuthUser(user),
            'secret'
        )

        return ServerUtils.redirectWithToast(
            '/',
            `Hello there ${user.name}`,
            'success',
            {
                'Set-Cookie': await userCookie.serialize(token),
            }
        )
    } catch (error) {
        console.error('/auth/sign-in', error)
        return ServerUtils.redirectWithToast(
            '/sign-in',
            `Unknown error: ${error}`,
            'error'
        )
    }
}
