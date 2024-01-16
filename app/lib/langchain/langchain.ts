import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { getRetriever } from "./vector-store-pg";
import { questionPrompt } from "./prompt";
import { model } from "./llm";
import { getPgVectorClient } from "./pg-client";
import { StreamingTextResponse } from "ai";

type callChainParams = {
    question: string;
    chatHistory?: string;
};

export async function callChain({ question, chatHistory }: callChainParams) {
    const outputParser = new StringOutputParser();
    const client = await getPgVectorClient()
    const retriever = await getRetriever(client);

    const chain = RunnableSequence.from([
        {
            question: (input: { question: string; chatHistory?: string }) =>
                input.question,
            chatHistory: (input: { question: string; chatHistory?: string }) =>
                input.chatHistory ?? "",
            context: async (input: { question: string; chatHistory?: string }) => {
                const relevantDocs = await retriever.getRelevantDocuments(
                    input.question,
                );
                const serialized = formatDocumentsAsString(relevantDocs);
                return serialized;
            },
        },
        questionPrompt,
        model,
        outputParser
    ]);

    const stream = await chain.stream({ question, chatHistory });
    return new StreamingTextResponse(stream)
}

