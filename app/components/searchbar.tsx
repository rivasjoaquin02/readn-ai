'use client'

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export function SearchBar({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (term) params.set('query', term);
        else params.delete('query');

        console.log(term);

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return <div className="relative w-[300px]">
        <SearchIcon className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
            type="search" 
            onChange={e => handleSearch(e.target.value)} 
            defaultValue={searchParams.get("query")?.toString()}
            className="pl-8 border-0" 
            placeholder={placeholder} />
    </div>
}
