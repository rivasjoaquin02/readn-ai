import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import type { Message } from "ai/react";
import { BotIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatLineProps extends Partial<Message> {
    sources: string[];
}

export function ChatLine({
    role = "assistant",
    content,
    sources
}: ChatLineProps) {
    if (!content) return null;

    return (
        <div>
            <Card className="mb-2">
                <CardHeader>
                    <span className={cn("flex", {
                        "justify-end": role === "user"
                    })}>
                        {role == "assistant" ? <BotIcon /> : <UserIcon />}
                    </span>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-pretty">
                        {content}
                    </p>
                </CardContent>
                <CardFooter>
                    <CardDescription className="w-full">
                        {sources && sources.length ? (
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                {sources.map((source, index) => (
                                    <AccordionItem
                                        value={`source-${index}`}
                                        key={index}
                                    >
                                        <AccordionTrigger>
                                            {`Source ${index + 1}`}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {source}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <></>
                        )}
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}

