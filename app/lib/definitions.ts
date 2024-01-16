import { z } from "zod";

// NOTE: can be raplaced with an ORM like prisma or drizzle

export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

export type User = z.infer<typeof UserSchema>;

export const BookSchema = z.object({
    id: z.string(),
    title: z.string(),
    pages: z.number(),
    genre: z.string(),
    cover: z.string().url(),
    synopsis: z.string(),
    year: z.number().gt(0),
    ISBN: z.string()
});

export type Book = z.infer<typeof BookSchema>;

const UserBookSchema = z.object({
    book_id: z.string(),
    user_id: z.string(),
    current_page: z.number().default(0),
    rating: z.number().gt(0).lt(5),
    favorite: z.boolean(),
    review: z.string()
});

export type UserBook = z.infer<typeof UserBookSchema>

export const AuthorSchema = z.object({
    id: z.string(),
    name: z.string()
});

export type Author = z.infer<typeof AuthorSchema>;

export const BookAuthorSchema = z.object({
    book_id: z.string(),
    author_id: z.string()
});

export type BookAuthor = z.infer<typeof BookAuthorSchema>;
