import { getFilteredBooks } from "@/lib/data";
import BookCard from "@/components/book";

type ListBooksProps = {
    query: string;
    currentPage: number;
    recent?: "asc" | "desc"
};
export async function ListBooks({ query, currentPage, recent }: ListBooksProps) {
    const books = await getFilteredBooks(query, currentPage, recent);

    return (
        <>
            {books.map((book) => (
                <BookCard key={book.id}>
                    <BookCard.Image
                        id={book.id}
                        href={`/books/${book.id}`}
                        src={book.cover}
                        alt={book.title}
                        className="w-[200px] h-[280px] "
                    />
                    <BookCard.Info>
                        <BookCard.Title>{book.title}</BookCard.Title>
                    </BookCard.Info>
                </BookCard>
            ))}
        </>
    );
}
