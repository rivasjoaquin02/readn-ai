import type { PoolConfig } from "pg";
import { z } from "zod";

const envSchema = z.object({
    PG_HOST: z.string().ip().default("127.0.0.1"),
    PG_PORT: z.coerce.number().default(5433),
    PG_USER: z.string(),
    PG_PASS: z.string(),
    PG_DATABASE: z.string(),
    OLLAMA_HOST: z.string().ip().default("127.0.0.1"),
    OLLAMA_PORT: z.coerce.number().default(11434),
    OLLAMA_MODEL: z.string()
});

export const env = envSchema.parse(process.env)

export const config = {
    postgresConnectionOptions: {
        type: "postgres",
        host: env.PG_HOST,
        port: env.PG_PORT,
        user: env.PG_USER,
        password: env.PG_PASS,
        database: env.PG_DATABASE,
    } as PoolConfig,
    tableName: "embeddings",
    columns: {
        idColumnName: "id",
        vectorColumnName: "vector",
        contentColumnName: "content",
        metadataColumnName: "metadata",
    },
};
