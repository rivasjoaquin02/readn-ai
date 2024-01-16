"use client";

import { useChat } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SendHorizonal } from "lucide-react";
import { ChatLine } from "@/components/chat/chat-line";

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } =
        useChat();

    return (
        <>
            <div className="overflow-y-auto">
            {messages.map((m) => (
                <ChatLine key={m.id} role={m.role} content={m.content} sources={[]} />
            ))}
            </div>
            <form className="flex gap-2" onSubmit={handleSubmit}>
                <Textarea
                    className="w-full botton-0 rounded mb-8 shadow-xl p-2"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Say something..."
                />
                <Button type="submit">
                    {isLoading ? <Spinner /> : <SendHorizonal />}
                </Button>
            </form>
        </>
    );
}

