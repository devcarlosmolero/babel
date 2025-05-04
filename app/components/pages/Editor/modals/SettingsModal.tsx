import { Cog } from 'lucide-react'
import Button from '~/components/atoms/Button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/atoms/shacdn/dialog'
import { useEditor } from '~/contexts/EditorContext'

export default function SettingsModal() {
    const { name, description, setName, setDescription } = useEditor()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="group flex h-[42px] max-h-[42px] w-[42px] min-w-[42px] max-w-[42px] items-center justify-center !bg-transparent !px-0 !py-0"
                >
                    <Cog
                        strokeWidth={'1'}
                        className="size-5 transition-all duration-500 group-hover:rotate-45"
                    />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div
                    style={{
                        backgroundColor:
                            'hsl(var(--babel-color-tertiary) / 0.02)',
                    }}
                    className="mt-3 flex flex-col items-center gap-3 rounded-md p-6 md:p-10"
                >
                    <input
                        onInput={(e) =>
                            setName((e.target as HTMLInputElement).value)
                        }
                        defaultValue={name}
                        placeholder="Give me a name"
                        className="w-full overflow-auto bg-transparent font-primary text-4xl font-bold text-tertiary placeholder:font-bold placeholder:text-tertiary/30 focus:outline-0"
                    />
                    <textarea
                        onInput={(e) =>
                            setDescription(
                                (e.target as HTMLTextAreaElement).value
                            )
                        }
                        defaultValue={description}
                        rows={4}
                        style={{ resize: 'none' }}
                        placeholder="Give me a description"
                        className="w-full overflow-auto bg-transparent text-lg text-tertiary/70 placeholder:text-tertiary/30 focus:outline-0"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
