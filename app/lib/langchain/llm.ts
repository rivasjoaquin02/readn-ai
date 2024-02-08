import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { env } from "@/lib/config";

const ollamaUrl = `http://${env.OLLAMA_HOST}:${env.OLLAMA_PORT}`
 
export const model = new ChatOllama({
    baseUrl: ollamaUrl,
    model: env.OLLAMA_MODEL,
    temperature: 0.6,
    verbose: true,
});

export const embeddings = new OllamaEmbeddings({
    baseUrl: ollamaUrl,
    model: env.OLLAMA_MODEL,
});
