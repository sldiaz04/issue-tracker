import {Table} from "@radix-ui/themes";
import NextLink from "next/link";
import {ArrowUpIcon} from "@radix-ui/react-icons";
import {IssueStatusBadge} from "@/app/components";
import {Issue, Status} from "@prisma/client";

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string
}

interface Props {
    searchParams: IssueQuery
    issues: Issue[]
}

const IssueTable = ({searchParams, issues}: Props) => {
    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map(column =>
                        <Table.ColumnHeaderCell key={column.value}
                                                className={column.className}>
                            <NextLink href={{
                                query: {...searchParams, orderBy: column.value}
                            }}>{column.label}</NextLink>
                            {column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>}
                        </Table.ColumnHeaderCell>
                    )}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map(issue =>
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <NextLink href={`/issues/${issue.id}`}>
                                {issue.title}
                            </NextLink>
                            <div className='block md:hidden'><IssueStatusBadge status={issue.status}/></div>
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'><IssueStatusBadge
                            status={issue.status}/></Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>{issue.createAt.toDateString()}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    );
}

const columns: { label: string, value: keyof Issue, className: string }[] = [
    {label: 'Issue', value: 'title', className: ''},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label: 'Created', value: 'createAt', className: 'hidden md:table-cell'}
];

export const columnNames = columns.map(column => column.value);

export default IssueTable;