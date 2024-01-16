import { NextRequest } from "next/server";
import type { Message as VercelChatMessage } from "ai";
import { callChain } from "@/lib/langchain/langchain";

//export const runtime = "edge "

const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const question = messages[messages.length - 1].content;

    try {
        const stream = callChain({
            question,
            chatHistory: formattedPreviousMessages,
        });
        return stream;
    } catch (e) {
        console.log(e);
    }
}

