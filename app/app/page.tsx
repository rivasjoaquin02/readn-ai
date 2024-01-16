import { PageTitle } from "@/components/page-title";
import { Quote } from "@/components/quote";
import { RecentBooks } from "@/components/recent-books";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const username = "Harvey";

    return (
        <main className="flex min-h-screen flex-col gap-10 p-6">
            <div className="flex w-full flex-col gap-8">
                <PageTitle variant="main">Happy reading, {username}</PageTitle>
                <Quote />
                <Button className="group mr-auto flex gap-2">
                    Start Reading
                    <MoveUpRightIcon
                        className="h-4 w-4 transition-transform 
                        group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                    />
                </Button>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                <PageTitle variant="sub">Recent Books</PageTitle>
                    <Link href="/books">
                        <MoreHorizontalIcon className="w-4 h-4"/>
                    </Link>
                </div>

                <div className="max-w-screen-sm">
                    <RecentBooks />
                </div>
            </div>
        </main>
    );
}
