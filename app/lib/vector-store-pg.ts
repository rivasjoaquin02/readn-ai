import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";

export async function embedAndStoreDocs(
    client: PGVectorStore,
    // @ts-ignore docs type error
    docs: Document<Record<string, any>>[]
) {
    /*create and store the embeddings in the vectorStore*/
    try {
        await client.addDocuments(docs)
        console.log("Correctly added docs to db")
    } catch (err) {
        console.error("Error while attempting to store docs in db", err)
        throw err
    }
}

export async function getRetriever(client: PGVectorStore) {
    return client.asRetriever();
}

