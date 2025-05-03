import { RefObject } from 'react'
import { EDITOR } from '~/consts'
import { IEditorBlockItem } from '~/types/editor'

function getLines(editorRef: RefObject<HTMLTextAreaElement>) {
    if (editorRef.current) {
        const text = editorRef.current.value
        return text.split('\n')
    }
    return []
}

function getBlocks(editorRef: RefObject<HTMLTextAreaElement>) {
    const lines = getLines(editorRef)

    const blocks = lines
        .map((line) => {
            const blocks: IEditorBlockItem[] = []

            let currentIndex = 0

            while (currentIndex < line.length) {
                EDITOR.FILL_COMMAND_REGEX.lastIndex = currentIndex
                EDITOR.CHOICE_COMMAND_REGEX.lastIndex = currentIndex

                const fillMatch = EDITOR.FILL_COMMAND_REGEX.exec(line)
                const choiceMatch = EDITOR.CHOICE_COMMAND_REGEX.exec(line)

                let nextMatch = null

                if (fillMatch && choiceMatch) {
                    nextMatch =
                        fillMatch.index < choiceMatch.index
                            ? fillMatch
                            : choiceMatch
                } else {
                    nextMatch = fillMatch || choiceMatch
                }

                if (!nextMatch) {
                    if (currentIndex < line.length) {
                        const remainingText = line.slice(currentIndex)
                        if (remainingText.trim()) {
                            blocks.push({
                                type: 'TEXT',
                                content: remainingText,
                            })
                        }
                    }
                    break
                }

                if (nextMatch.index > currentIndex) {
                    const textBefore = line.slice(currentIndex, nextMatch.index)
                    if (textBefore.trim()) {
                        blocks.push({
                            type: 'TEXT',
                            content: textBefore,
                        })
                    }
                }

                if (nextMatch === fillMatch) {
                    blocks.push({
                        type: 'FILL',
                        answer: fillMatch[1],
                    })
                    currentIndex = fillMatch.index + fillMatch[0].length
                } else {
                    if (choiceMatch && choiceMatch.length > 0) {
                        const options = choiceMatch[1].split(',')
                        blocks.push({
                            type: 'CHOICE',
                            options,
                            answer: options[0],
                        })
                        currentIndex = choiceMatch.index + choiceMatch[0].length
                    }
                }
            }

            return blocks
        })
        .filter((blocks) => blocks.length > 0)
    return blocks
}

const EditorUtils = {
    getBlocks,
}

export default EditorUtils
