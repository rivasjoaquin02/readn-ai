import { unstable_noStore as noStore } from "next/cache";
import type { Book } from "@/lib/definitions";
import { sql } from "@/lib/db";

export async function getBooks(): Promise<Book[]> {
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    //noStore();

    try {
        console.log("Fetching revenue data..");
        const data = await sql<Book[]>`SELECT * FROM book;`;
        console.log("Book Fetching completed");
        return data;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch revenue data.");
    }
}

const ITEMS_PER_PAGE = 6;

export async function getBookPages(query: string): Promise<number> {
    //noStore();

    try {
        const count = await sql`
        SELECT COUNT(*)
        FROM book
        WHERE 
            book.title ILIKE ${`%${query}%`} OR
            book.genre ILIKE ${`%${query}%`} OR
            book.year::text ILIKE ${`%${query}%`}
        `;

        const amountItems = Number(count[0].count);
        const totalPages = Math.ceil(amountItems / ITEMS_PER_PAGE);
        return totalPages;
    } catch (err) {
        console.error("Faild to fetch the data: ", err);
        throw err;
    }
}

export async function getFilteredBooks(
    query: string,
    currentPage: number,
    userId?: string
): Promise<Book[]> {
    //noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const books = await sql<Book[]>`
        SELECT 
            book.id, 
            book.title, 
            book.pages, 
            book.genre, 
            book.cover, 
            book.synopsis, 
            book.year, 
            book.ISBN
        FROM book
        WHERE 
            book.title ILIKE ${`%${query}%`} OR
            book.genre ILIKE ${`%${query}%`} OR
            book.year::text ILIKE ${`%${query}%`}
        ORDER BY book.year DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};`;

        return books;
    } catch (err) {
        console.error("Failed to get books:", err);
        throw err;
    }
}

export async function getBookById(id: string): Promise<Book> {
    //noStore();

    try {
        const books = await sql<Book[]>`
        SELECT 
            book.id, 
            book.title, 
            book.pages, 
            book.genre, 
            book.cover, 
            book.synopsis, 
            book.year, 
            book.ISBN
        FROM book
        WHERE 
            book.id = ${id};`;

        return books[0];
    } catch (err) {
        console.error(`Failed to get the book with id ${id}:`, err);
        throw err;
    }
}
