'use client'

import { cn } from "@/lib/utils";
import {
    LibraryBigIcon,
    PersonStandingIcon,
    SparklesIcon
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const links = [
    {
        title: "Books",
        href: "/books",
        icon: LibraryBigIcon,
        label: "All Books",
    },
    {
        title: "Chat",
        href: "/chat",
        icon: SparklesIcon,
        label: "Chat with AI",
    },
    {
        title: "Area",
        href: "/area",
        icon: PersonStandingIcon,
        label: "Your Area",
    }
];

type NavLinksProps = {
    isCollapsed: boolean
}

export default function NavLinks({ isCollapsed }: NavLinksProps) {
    const pathname = usePathname()

    const className =
        "flex w-full px-4 py-2 gap-2 justify-start items-center rounded-full opacity-60 hover:opacity-100"
    const conditionalClasses = (link: string) => ({
        "justify-center p-0 h-12 w-12": isCollapsed,
        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white":
            pathname === link
    })
    const iconClassName = "h-6 w-6";

    return <>
        {links.map((link, index) => (
            isCollapsed
                ? <Tooltip key={index}>
                    <TooltipTrigger asChild>
                        <Link href={link.href} className={cn(
                            className,
                            conditionalClasses(link.href)
                        )}>
                            <link.icon className={iconClassName} />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{link.label}</TooltipContent>
                </Tooltip>
                : <Link key={index} href={link.href} className={cn(
                    className,
                    conditionalClasses(link.href)
                )}>
                    <link.icon className={iconClassName} />
                    {link.title}
                </Link>
        ))}
    </>
}

