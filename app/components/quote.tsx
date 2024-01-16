import { QuoteIcon } from "lucide-react";
import { getQuote } from "@/lib/data";

export async function Quote() {
    const quote = await getQuote();

    if (!quote) return <div>Sorry 🥲</div>;

    return (
        <p className="max-w-[400px]">
            <QuoteIcon className="mr-2 inline-block h-4 w-4 rotate-180" />
            {quote.content}
            <QuoteIcon className="ml-2 inline-block h-4 w-4" />
        </p>
    );
}
