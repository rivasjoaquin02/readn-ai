import { ChatOllama } from "langchain/chat_models/ollama";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { env } from "./config";

const ollamaUrl = `http://${env.OLLAMA_HOST}:${env.OLLAMA_PORT}`
 
export const model = new ChatOllama({
    baseUrl: ollamaUrl,
    model: env.OLLAMA_MODEL,
    temperature: 0,
    verbose: true,
});

export const embeddings = new OllamaEmbeddings({
    baseUrl: ollamaUrl,
    model: env.OLLAMA_MODEL,
});
