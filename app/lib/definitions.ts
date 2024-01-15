import { z } from "zod";

// NOTE: can be raplaced with an ORM like prisma or drizzle

export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export type User = z.infer<typeof UserSchema>

export const BookSchema = z.object({
    id: z.string(),
    title: z.string(),
    pages: z.number(),
    genre: z.string(),
    cover: z.string().url(),
    synopsis: z.string(),
    year: z.number().gt(0),
    ISBN: z.string(),
});

export type Book = z.infer<typeof BookSchema>

export const AuthorSchema = z.object({
    id: z.string(),
    name: z.string()
})

export type Author = z.infer<typeof AuthorSchema>

export const BookAuthorSchema = z.object({
    book_id: z.string(),
    author_id: z.string()
})

export type BookAuthor = z.infer<typeof BookAuthorSchema>
