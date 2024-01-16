import { LogInIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { SearchBar } from "@/components/searchbar";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Filter } from "./filter";

export function NavBar() {
    const avatarImg = "https://github.com/shadcn.png";

    return (
        <>
            <SearchBar placeholder="Search book, name, author ..." />

            <div className="flex gap-2 items-center">
                <Filter />
            </div>

            <div className="flex gap-2">
                <ModeToggle />
                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={avatarImg} />
                            <AvatarFallback>
                                <UserIcon className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-[180px]">
                        <Button
                            variant="ghost"
                            className="flex items-center gap-4"
                        >
                            <UserIcon className="h-4 w-4" />
                            Profile
                        </Button>
                        <Separator />
                        <Button
                            variant="ghost"
                            className="group flex items-center gap-4"
                        >
                            <SettingsIcon className="group-hover:animate-spin h-4 w-4" />
                            Settings
                        </Button>

                        <Button
                            variant="ghost"
                            className="flex items-center gap-4"
                        >
                            <LogInIcon className="h-4 w-4" />
                            Login
                        </Button>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-4"
                        >
                            <LogOutIcon className="h-4 w-4" />
                            Logout
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
}
