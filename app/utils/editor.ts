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

function getBlocks(
    editorRef: RefObject<HTMLTextAreaElement>
): IEditorBlockItem[] {
    const lines = getLines(editorRef)

    const blocks = lines
        .map((line, row) => {
            const blocks: IEditorBlockItem[] = []

            let currentIndex = 0
            let blockPosition = 0

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
                                row,
                                position: blockPosition++,
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
                            row,
                            position: blockPosition++,
                        })
                    }
                }

                if (nextMatch === fillMatch) {
                    blocks.push({
                        type: 'FILL',
                        spaces: {
                            leading: fillMatch[1] === ' ',
                            trailing: fillMatch[3] === ' ',
                        },
                        answer: fillMatch[2],
                        row,
                        position: blockPosition++,
                    })
                    currentIndex = fillMatch.index + fillMatch[0].length
                } else {
                    if (choiceMatch && choiceMatch.length > 0) {
                        const options = choiceMatch[2].split(',')
                        blocks.push({
                            type: 'CHOICE',
                            options,
                            spaces: {
                                leading: choiceMatch[1] === ' ',
                                trailing: choiceMatch[3] === ' ',
                            },
                            answer: options[0],
                            row,
                            position: blockPosition++,
                        })
                        currentIndex = choiceMatch.index + choiceMatch[0].length
                    }
                }
            }

            return blocks
        })
        .filter((blocks) => blocks.length > 0)
        .flat() // Flatten the nested arrays into a single array of blocks
    return blocks
}

const EditorUtils = {
    getBlocks,
}

export default EditorUtils
