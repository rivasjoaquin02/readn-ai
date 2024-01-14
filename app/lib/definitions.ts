import { z } from "zod";

// NOTE: can be raplaced with an ORM like prisma or drizzle

export const User = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export const Book = z.object({
    id: z.string(),
    title: z.string(),
    pages: z.number(),
    genre: z.string(),
    cover: z.string().url(),
    synopsis: z.string(),
    year: z.number().gt(0),
    ISBN: z.string(),
});

export const Author = z.object({
    id: z.string(),
    name: z.string()
})

export const BookAuthor = z.object({
    book_id: z.string(),
    author_id: z.string()
})

