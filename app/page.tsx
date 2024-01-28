import IssueSummary from "@/app/IssueSummary";

export default async function Home() {
    const totalOpen = await prisma?.issue.count({where: {status: 'OPEN'}}) || 0;
    const totalInProgress = await prisma?.issue.count({where: {status: 'IN_PROGRESS'}}) || 0;;
    const totalClosed = await prisma?.issue.count({where: {status: 'CLOSED'}}) || 0;;

    return (
        // <LatestIssue/>
        <IssueSummary open={totalOpen} inProgress={totalInProgress} closed={totalClosed}/>
    )
}
