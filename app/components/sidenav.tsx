"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, BookIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NavLinks from "@/components/nav-links";


export function SideNav() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleSideBar = () => setIsCollapsed(!isCollapsed);

    const collapsedIcon = isCollapsed ? (
        <ArrowRightIcon className="h-6 w-6" />
    ) : (
        <ArrowLeftIcon className="h-6 w-6" />
    );

    return (
        <aside
            className={cn(
                `hidden h-screen -translate-x-full flex-col items-center 
                 justify-between border-r-2 py-8 sm:translate-x-0 md:flex `,
                isCollapsed ? "w-[80px]" : "w-[150px]"
            )}
            style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
        >
            <Link href="/">
                <BookIcon className="w-6 h-6" />
            </Link>

            <nav className="flex flex-col items-center space-y-2 font-medium">
                <NavLinks isCollapsed={isCollapsed} />
            </nav>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        className={`flex h-12 w-12 items-center rounded-full
                            opacity-60 hover:opacity-100`}
                        onClick={toggleSideBar}
                    >
                        {collapsedIcon}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Expand Sidebar</TooltipContent>
            </Tooltip>
        </aside>
    );
}



