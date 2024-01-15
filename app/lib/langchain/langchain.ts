import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnableSequence } from "langchain/schema/runnable";
import { formatDocumentsAsString } from "langchain/util/document";
import { getRetriever } from "./vector-store-pg";
import { questionPrompt } from "./prompt";
import { model } from "./llm";
import { getPgVectorClient } from "./pg-client";

type callChainParams = {
    question: string;
    chatHistory?: string;
};

export async function callChain({ question, chatHistory }: callChainParams) {
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
        new StringOutputParser(),
    ]);

    const stream = await chain.stream({ question, chatHistory });
    return stream;
}

