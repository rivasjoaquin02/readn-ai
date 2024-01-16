import { ListBooks } from "@/components/list-books";
import { Pagination } from "@/components/pagination";
import { getBookPages } from "@/lib/data";

export default async function Page({
    searchParams
}: {
    searchParams?: {
        query?: string;
        page?: string;
        recent?: "asc" | "desc"  
    };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const recent = searchParams?.recent
    const totalPages = await getBookPages(query);

    return (
        <main>
            <ul
                className="grid gap-4"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))"
                }}
            >
                <ListBooks query={query} currentPage={currentPage} recent={recent} />
            </ul>
            <Pagination totalPages={totalPages} />
        </main>
    );
}
