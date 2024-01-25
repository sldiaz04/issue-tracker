import Link from "next/link";
import {Button} from "@radix-ui/themes";

const DeleteIssueButton = ({issueId}: { issueId: number }) => {
    return (
        <Button color='red'>
            <Link href={`/issues/${issueId}/edit`}>Delete Issue</Link>
        </Button>
    );
}

export default DeleteIssueButton;