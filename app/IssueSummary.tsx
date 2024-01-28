import {Card, Flex, Text} from "@radix-ui/themes";
import {Status} from "@prisma/client";
import Link from "next/link";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({open, inProgress, closed}: Props) => {
    const items: { label: string, value: number, status: Status }[] = [
        {label: "Open Issues", value: open, status: Status.OPEN},
        {label: "In Progress Issues", value: inProgress, status: Status.IN_PROGRESS},
        {label: "Closed Issues", value: closed, status: Status.CLOSED},
    ];

    return (
        <Flex gap='2'>
            {items.map(item =>
                <Card key={item.label}>
                    <Flex direction='column' gap='1'>
                        <Link className='text-sm font-medium' href={`/issues?status=${item.status}`}>{item.label}</Link>
                        <Text size='5' className='font-bold'>{item.value}</Text>
                    </Flex>
                </Card>)
            }
        </Flex>
    );
}

export default IssueSummary;