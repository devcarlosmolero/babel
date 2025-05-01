import { Table } from '~/components/atoms/shacdn/ui/table'
import { ReactNode } from 'react'

export const DataTable = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div className="overflow-x-scroll rounded border md:overflow-auto">
                <Table>{children}</Table>
            </div>
        </div>
    )
}
