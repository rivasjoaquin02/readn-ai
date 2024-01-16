import { getFilteredBooks } from "@/lib/data"
import BookCard from "@/components/book"

type ListBooksProps = {
    query: string,
    currentPage: number
}
export async function ListBooks({ query, currentPage }: ListBooksProps) {
    const books = await getFilteredBooks(query, currentPage)

    return <>
        {books.map((book) =>
            <BookCard key={book.id}  >
                <BookCard.Image id={book.id} href={`/books/${book.id}`} src={book.cover} alt={book.title} />
                <BookCard.Info>
                    <BookCard.Title >
                        {book.title}
                    </BookCard.Title >
                </BookCard.Info>
            </BookCard>
        )}
    </>
}
