"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ArrowDownUpIcon, StarIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Filter() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    if (pathname !== "/books") return null;

    const toggleFavorite = () => {
        const params = new URLSearchParams(searchParams);

        let isSet = params.get("filterByFavorite") || "false";
        isSet = isSet === "true" ? "false" : "true";

        if (isSet === "true") params.set("filterByFavorite", isSet);
        else params.delete("filterByFavorite");

        replace(`${pathname}?${params.toString()}`);
    };

    const toggleSortRecent = () => {
        const params = new URLSearchParams(searchParams);

        let isSet = params.get("recent");

        switch (isSet) {
            case null:
                isSet = "asc";
                params.set("recent", isSet);
                break;
            case "asc":
                isSet = "desc";
                params.set("recent", isSet);
                break;
            case "desc":
                params.delete("recent");
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle onClick={toggleFavorite} className="h-8 w-8 p-0">
                        <StarIcon className="h-4 w-4" />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent side="bottom">Favorites</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle onClick={toggleSortRecent} className="h-8 w-8 p-0">
                        <ArrowDownUpIcon className="h-4 w-4" />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent side="bottom">Sort by Recent</TooltipContent>
            </Tooltip>
        </>
    );
}
