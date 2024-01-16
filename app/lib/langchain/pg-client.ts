import { PGVectorStore } from "@langchain/community/vectorstores/pgvector"
import { embeddings } from "@/lib/langchain/llm";
import { config } from "@/lib/config";

let pgVectorClientInstance: PGVectorStore | null = null;

async function initPgVectorClient(): Promise<PGVectorStore> {
    try {
        const pgvectorStore = await PGVectorStore.initialize(embeddings, config);
        return pgvectorStore;
    } catch (err) {
        console.error("Error while initializing pg-vector instance");
        throw err;
    }
}

export async function getPgVectorClient(): Promise<PGVectorStore> {
    if (!pgVectorClientInstance)
        pgVectorClientInstance = await initPgVectorClient();
    return pgVectorClientInstance;
}
