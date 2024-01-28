import {Table} from "@radix-ui/themes";
import prisma from '@/prisma/client'
import {IssueStatusBadge} from '@/app/components'
import IssueActions from "@/app/issues/IssueActions";
import {Issue, Status} from "@prisma/client";
import NextLink from "next/link";
import {ArrowUpIcon} from "@radix-ui/react-icons";

interface Props {
    searchParams: { status: Status, orderBy: keyof Issue }
}

const IssuesPage = async ({searchParams}: Props) => {
    const columns: { label: string, value: keyof Issue, className: string }[] = [
        {label: 'Issue', value: 'title', className: ''},
        {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
        {label: 'Created', value: 'createAt', className: 'hidden md:table-cell'}
    ];

    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

    const issues = await prisma.issue.findMany({
        where: {
            status
        }
    });
    // await delay(1000);// for debugging the loading indicator

    return (
        <div>
            <IssueActions/>
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
        </div>
    );
}

// export const dynamic = 'force-dynamic';

/*
* revalidate
* value=0, is the same as 'force-dynamic'
* */
export const revalidate = 0;

export default IssuesPage;