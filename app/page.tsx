import IssueSummary from "@/app/IssueSummary";
import IssueChart from "@/app/IssueChart";
import {Flex, Grid} from "@radix-ui/themes";
import LatestIssue from "@/app/LatestIssue";
import {Metadata} from "next";

export default async function Home() {
    const totalOpen = await prisma?.issue.count({where: {status: 'OPEN'}}) || 0;
    const totalInProgress = await prisma?.issue.count({where: {status: 'IN_PROGRESS'}}) || 0;
    const totalClosed = await prisma?.issue.count({where: {status: 'CLOSED'}}) || 0;

    return (
        <Grid columns={{initial: "1", md: "2"}} gap="5">
            <Flex direction='column' gap="5">
                <IssueSummary open={totalOpen} inProgress={totalInProgress} closed={totalClosed}/>
                <IssueChart open={totalOpen} inProgress={totalInProgress} closed={totalClosed}/>
            </Flex>
            <LatestIssue/>
        </Grid>
    )
}

export const metadata: Metadata = {
    title: 'Issue Tracker - Dashboard',
    description: 'View a summary of project issues.'
};
