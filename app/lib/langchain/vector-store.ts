import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { embeddings } from "./llm";
import { getChunkedDocs } from "./loader";

/* Load in the file we want to do question answering over */
//const text = fs.readFileSync("state_of_the_union.txt", "utf8");
/* Split the text into chunks */
//const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
//const docs = await textSplitter.createDocuments([text]);
/* Create the vectorstore */

const docs = await getChunkedDocs()
const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);

export function getRetriever() {
    return vectorStore.asRetriever();
}
