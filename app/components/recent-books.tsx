import { getRecentBooks } from "@/lib/data";
import BookCard from "@/components/book";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

export async function RecentBooks() {
    const books = await getRecentBooks();

    return (
        <>
            <Carousel>
                <CarouselContent>
                    {books.map((book) => (
                        <CarouselItem key={book.id} className="basis-1/2 md:basis-1/4 ">
                            <BookCard>
                                <BookCard.Image
                                    id={book.id}
                                    href={`/books/${book.id}`}
                                    src={book.cover}
                                    alt={book.title}
                                    className="w-[150px] h-[200px]"
                                />
                            </BookCard>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </>
    );
}
