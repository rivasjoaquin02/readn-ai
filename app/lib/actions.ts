"use server"

import { sql } from "@/lib/db"

export async function toggleFavorite(userId: string, bookId: string, formData: FormData) {
    try {
        const isFavorite = await sql`
        SELECT favorite 
        FROM user_book
        WHERE user_id = ${userId} AND book_id = ${bookId};`

        await sql`
        UPDATE user_book 
        SET favorite = ${!isFavorite[0].favorite}
        WHERE user_id = ${userId} AND book_id = ${bookId};`
    } catch (err) {
        console.error(`Error while changing favorite of user_id = ${userId}, book_id ${bookId}`, err)
        throw err
    }
}
