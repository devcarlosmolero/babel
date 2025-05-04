import { Command, Lightbulb } from 'lucide-react'
import Button from '~/components/atoms/Button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/atoms/shacdn/dialog'

export default function CommandsModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="group flex h-[42px] max-h-[42px] w-[42px] min-w-[42px] max-w-[42px] items-center justify-center !bg-transparent !px-0 !py-0"
                >
                    <Command
                        strokeWidth={'1'}
                        className="size-5 transition-all duration-500 group-hover:rotate-45"
                    />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Commands</DialogTitle>
                </DialogHeader>
                <div className="mt-3 flex flex-col items-center gap-3 md:flex-row">
                    <div className="flex h-full flex-col gap-y-3 rounded-md border border-border bg-white/90 p-5 md:w-[50%]">
                        <div className="flex items-center gap-2">
                            <Command className="size-6 text-tertiary/70" />
                            <h2 className="font-primary text-2xl font-bold text-tertiary">
                                fill:value
                            </h2>
                        </div>
                        <p className="h-full font-secondary text-sm/tight italic text-tertiary/70">
                            Creates a fill-in-the-blank input. The value must be
                            the correct answer.
                        </p>
                        <p className="flex items-center gap-2 rounded-md bg-primary/5 px-2 py-2 font-secondary text-sm/tight text-primary">
                            <Lightbulb
                                className="h-4 min-h-4 w-4 min-w-4"
                                strokeWidth={'1'}
                            />
                            My fill:name is Andrew.
                        </p>
                    </div>
                    <div className="flex h-full flex-col gap-y-3 rounded-md border border-border bg-white/90 p-5 md:w-[50%]">
                        <div className="flex w-full items-center gap-2">
                            <Command className="size-6 text-tertiary/70" />
                            <h2 className="font-primary text-2xl font-bold text-tertiary">
                                choice:values
                            </h2>
                        </div>
                        <p className="font-secondary text-sm/tight italic text-tertiary/70">
                            Creates a choice input with multiple badges. The
                            user selects one. The first value must be the
                            correct answer.
                        </p>
                        <p className="font-secondary text-sm/tight font-bold text-tertiary/70">
                            Choices are shuffled upon publishing.
                        </p>
                        <p className="flex items-start gap-2 rounded-md bg-primary/5 px-2 py-2 font-secondary text-sm/tight text-primary">
                            <Lightbulb
                                className="h-4 min-h-4 w-4 min-w-4"
                                strokeWidth={'1'}
                            />
                            I choice:want,get,do to eat carrots
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
