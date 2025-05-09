import { Form } from '@remix-run/react'
import { Lock, Mail } from 'lucide-react'
import Button from '~/components/atoms/Button'
import Input from '~/components/atoms/shacdn/input'
import Page from '~/components/templates/Page'

export default function SignInPage() {
    return (
        <Page className="flex h-screen items-center justify-center">
            <Form
                method="POST"
                action="/api/auth/sign-in"
                className="flex max-w-[500px] flex-col gap-y-8 rounded-lg border border-border bg-white/60 p-6 backdrop-blur md:p-10"
            >
                <div className="flex items-center justify-center">
                    <img
                        alt="Logo"
                        className="w-[50px] md:w-[70px]"
                        src="./logo.png"
                    />
                </div>
                <div className="space-y-3 text-center">
                    <h1 className="font-primary text-4xl font-bold md:text-5xl">
                        Sign In
                    </h1>
                    <p className="text-sm text-tertiary md:text-base">
                        Babel is in private beta, this means that you need
                        <br className="hidden md:block" /> to&nbsp;
                        <a
                            href="mailto:hi@carlosmolero.com"
                            className="text-tertiary/70 underline decoration-dotted underline-offset-4 hover:text-tertiary"
                        >
                            contact an administrator
                        </a>
                        &nbsp;to have an account.
                    </p>
                </div>
                <div className="space-y-3">
                    <Input
                        icon={<Mail className="size-4" />}
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                    />
                    <Input
                        icon={<Lock className="size-4" />}
                        placeholder="Password"
                        type="password"
                        name="password"
                        required
                    />
                </div>
                <Button className="w-full !text-xl md:!py-3">Sign in</Button>
            </Form>
        </Page>
    )
}
