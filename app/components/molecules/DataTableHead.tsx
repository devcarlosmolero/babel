import {
    TableHeader,
    TableRow,
    TableHead,
} from '~/components/atoms/shacdn/ui/table'

export const DataTableHead = ({
    heads,
}: {
    heads: { label: string; className?: string }[]
}) => {
    return (
        <TableHeader>
            <TableRow>
                {heads.map((head, index) => {
                    return (
                        <TableHead key={index} className={head.className}>
                            {head.label}
                        </TableHead>
                    )
                })}
            </TableRow>
        </TableHeader>
    )
}
