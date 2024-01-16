"use client";

import {
    Pagination as ShadcnPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
    totalPages: number;
};

export function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1

    const createPageURL = (page: number): string => {
        page = page < 1 ? 1 : page
        page = page > totalPages ? totalPages : page

        const params = new URLSearchParams(searchParams)
        params.set("page", page.toString())
        return `${pathname}?${params.toString()}`
    }

    return (
        <ShadcnPagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={createPageURL(currentPage - 1)} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href={createPageURL(1)}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={createPageURL(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    );
}
