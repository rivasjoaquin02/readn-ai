import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {

    return <div className="relative w-[300px]">
        <SearchIcon className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input type="search" className="pl-8 border-0" placeholder="Search book, name, author ..." />
    </div>
}
