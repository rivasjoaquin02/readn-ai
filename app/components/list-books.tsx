import { getBooks } from "@/lib/data"
import  BookCard  from "./book"

export async function ListBooks() {
    const books = await getBooks()

    return <>
        {books.map((book) =>
            <BookCard key={book.id} book={book} >
                <BookCard.Image src={book.cover} alt={book.title}/>
                <BookCard.Info>
                    <BookCard.Title >
                        {book.title}
                    </BookCard.Title >
                </BookCard.Info>
            </BookCard>
        )}
    </>
}
