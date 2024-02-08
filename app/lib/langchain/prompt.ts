import { PromptTemplate } from "@langchain/core/prompts";

/**
 * Create a prompt template for generating an answer based on context and
 * a question.
 *
 * Chat history will be an empty string if it's the first question.
 *
 * inputVariables: ["chatHistory", "context", "question"]
 */
export const questionPrompt = PromptTemplate.fromTemplate(
    `Usa las el siguiente contexto para responder la pregunta. Si no conoces la respuesta, solo di que no la conoces, no intentes inventar una respuesta
----------
CONTEXT: {context}
----------
CHAT HISTORY: {chatHistory}
----------
QUESTION: {question}
----------
Respuesta:`
);
