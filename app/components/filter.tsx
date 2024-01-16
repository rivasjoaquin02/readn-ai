"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { StarIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export function Filter() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter()

    if (pathname !== "/books") return null;

    const toggleFavorite = () => {
        const params = new URLSearchParams(searchParams);

        let isSet = params.get("filterByFavorite") || "false";
        isSet = isSet === "true" ? "false" : "true";

        if (isSet === "true") params.set("filterByFavorite", isSet);
        else params.delete("filterByFavorite")

        replace(`${pathname}?${params.toString()}`)
    };

    return (
        <>
            <Toggle onClick={toggleFavorite} className="h-8 w-8 p-0">
                <StarIcon className="h-4 w-4" />
            </Toggle>
            dfsfd
        </>
    );
}
