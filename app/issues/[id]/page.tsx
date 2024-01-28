import prisma from '@/prisma/client'
import {notFound} from "next/navigation";
import {Box, Flex, Grid} from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";
import {Metadata} from "next";

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({params}: Props) => {
    // await delay(1000);// for debugging the loading indicator

    const session = await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });

    if (!issue) notFound();

    return (
        <Grid columns={{initial: "1", sm: "5"}} gap="5">
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue}/>
            </Box>
            {session && <Box>
                <Flex direction='column' gap='4'>
                    <AssigneeSelect issue={issue}/>
                    <EditIssueButton issueId={issue.id}/>
                    <DeleteIssueButton issueId={issue.id}/>
                </Flex>
            </Box>}
        </Grid>
    );
}

export async function generateMetadata({params}: Props) {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}});
    return {
        title: issue?.title,
        description: `Details of issue ${issue?.id}`
    }
}

export default IssueDetailPage;