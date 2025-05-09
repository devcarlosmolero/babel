import { AppLoadContext } from '@remix-run/cloudflare'
import { eq } from 'drizzle-orm'
import { db } from '~/db/drizzle'
import { users } from '~/db/schema/user'

function getOneByEmail(email: string, context: AppLoadContext) {
    return db(context.cloudflare.env.DB)
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
        .get()
}

const UserRepository = {
    getOneByEmail,
}

export default UserRepository
