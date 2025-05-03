import {
    TableRow,
    TableCell,
    TableBody,
} from '~/components/atoms/shacdn/ui/table'
import { ReactNode } from 'react'

interface IDataTableBodyProps {
    items: any[]
    renderers: IDataTableBodyRenderer[]
}

export interface IDataTableBodyRenderer {
    key?: string
    cellClassName?: string
    component?: (item: any) => ReactNode
    formatFunction?: (value: any) => void
}

export const DataTableBody = ({ items, renderers }: IDataTableBodyProps) => {
    return (
        <TableBody>
            <Cells items={items} renderers={renderers} />
        </TableBody>
    )
}

const Cells = ({
    items,
    renderers,
}: {
    items: any[]
    renderers: IDataTableBodyRenderer[]
}) => {
    const getKeyValue = (item: any, renderer: IDataTableBodyRenderer) => {
        return renderer.formatFunction
            ? renderer.formatFunction!(item[renderer.key!])
            : item[renderer.key!]
    }

    return (
        <>
            {items.map((item, i) => {
                return (
                    <TableRow key={i}>
                        {renderers.map((renderer, j) => {
                            return (
                                <TableCell key={j}>
                                    <>
                                        {renderer.key &&
                                            getKeyValue(item, renderer)}
                                        {!renderer.key &&
                                            renderer.component!(item)}
                                    </>
                                </TableCell>
                            )
                        })}
                    </TableRow>
                )
            })}
        </>
    )
}
