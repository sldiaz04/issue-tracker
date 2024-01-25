import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";
import ReactMarkdown from "react-markdown";
import {Issue} from "@prisma/client";

const IssueDetails = ({issue}: { issue: Issue }) => {
    return (
        <>
            <Heading as='h2'>{issue.title}</Heading>
            <Flex gap='2' my='2'>
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full' mt='4'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    );
}

export default IssueDetails;