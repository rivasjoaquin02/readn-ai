import { unstable_noStore as noStore } from 'next/cache';
import postgres from "postgres"
import { env } from '@/lib/config';
import type { Book } from '@/lib/definitions';

const sql = postgres({
    host: env.PG_HOST,
    port: env.PG_PORT,
    user: env.PG_USER,
    pass: env.PG_PASS,
    database: env.PG_DATABASE
})

export async function getBooks() {
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore()

    try {
        console.log("Fetching revenue data..")
        const data = await sql<Book[]>`SELECT * FROM book;`
        console.log("Book Fetching completed")
        return data

    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch revenue data.');
    }

}
