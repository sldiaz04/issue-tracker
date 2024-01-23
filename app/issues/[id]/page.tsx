import prisma from '@/prisma/client'
import {notFound} from "next/navigation";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";
import ReactMarkdown from "react-markdown";

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({params}: Props) => {
    // await delay(1000);// for debugging the loading indicator

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });

    if (!issue) notFound();

    return (
        <div>
            <Heading as='h2'>{issue.title}</Heading>
            <Flex gap='2' my='2'>
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='4'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    );
}

export default IssueDetailPage;