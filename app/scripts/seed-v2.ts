import { sql } from "@/lib/db";
import bcrypt from "bcrypt";
import {
    users,
    books,
    authors,
    authorBook,
    userBook
} from "@/lib/placeholder-data";
import type {
    Book,
    User,
    Author,
    AuthorBook,
    UserBook
} from "@/lib/definitions";
import { DatabaseTableBuilder } from "@/scripts/database-table";

async function main() {
    // user
    const userTable = new DatabaseTableBuilder<User>("user")
        .withData(users)
        .withCreateTableCallback(async () => {
            await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
            await sql`CREATE TABLE IF NOT EXISTS "user" (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );`;
        })
        .withInsertDataCallback(async (data) => {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            return sql`
                 INSERT INTO "user" (id, name, email, password)
                 VALUES (${data.id}, ${data.name}, ${data.email}, ${hashedPassword})
                 ON CONFLICT (id) DO NOTHING;`;
        })
        .build();

    await userTable.createTable();
    await userTable.insertData();

    // authorTable
    const authorTable = new DatabaseTableBuilder<Author>("author")
        .withData(authors)
        .withCreateTableCallback(async () => {
            await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
            await sql`CREATE TABLE IF NOT EXISTS author (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255)
            );`;
        })
        .withInsertDataCallback(async (data) => {
            sql`INSERT INTO author (id, name)
                 VALUES (${data.id}, ${data.name})
                 ON CONFLICT (id) DO NOTHING;`;
        })
        .build();

    await authorTable.createTable();
    await authorTable.insertData();

    const bookTable = new DatabaseTableBuilder<Book>("book")
        .withData(books)
        .withCreateTableCallback(async () => {
            await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
            await sql`CREATE TABLE IF NOT EXISTS book (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title VARCHAR(255),
                pages INT NOT NULL,
                genre VARCHAR(255),
                cover TEXT,
                synopsis TEXT,
                dateAdded DATE,
                year INT,
                ISBN VARCHAR(20)
            );`;
        })
        .withInsertDataCallback(async (data) => {
            sql`INSERT INTO book (id, title, pages, genre, cover, synopsis, dateAdded, year, ISBN)
             VALUES (
                ${data.id}, 
                ${data.title}, 
                ${data.pages}, 
                ${data.genre}, 
                ${data.cover}, 
                ${data.synopsis},
                ${data.dateAdded},
                ${data.year}, 
                ${data.ISBN})
             ON CONFLICT (id) DO NOTHING;`;
        })
        .build();

    await bookTable.createTable();
    await bookTable.insertData();

    // userBook
    const userBookTable = new DatabaseTableBuilder<UserBook>("userBook")
        .withData(userBook)
        .withCreateTableCallback(async () => {
            await sql`CREATE TABLE IF NOT EXISTS userBook (
                userId UUID NOT NULL,
                bookId UUID NOT NULL,
                current_page INT DEFAULT 0,
                rating INT,
                favorite BOOL,
                review TEXT,
                CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES "user"(id),
                CONSTRAINT fk_book FOREIGN KEY (bookId) REFERENCES book(id)
            );`;
        })
        .withInsertDataCallback(async (data) => {
            sql`INSERT INTO userBook (userId, bookId, current_page, rating, favorite, review)
             VALUES (
                ${data.userId},
                ${data.bookId},
                ${data.current_page},
                ${data.rating},
                ${data.favorite},
                ${data.review})
             ON CONFLICT DO NOTHING;`;
        })
        .build();

    await userBookTable.createTable();
    await userBookTable.insertData();

    // authorBook
    const authorBookTable = new DatabaseTableBuilder<AuthorBook>("authorBook")
        .withData(authorBook)
        .withCreateTableCallback(async () => {
            await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
            await sql`CREATE TABLE IF NOT EXISTS authorBook (
                bookId UUID NOT NULL,
                authorId UUID NOT NULL,
                CONSTRAINT fk_book FOREIGN KEY (bookId) REFERENCES book(id),
                CONSTRAINT fk_author FOREIGN KEY (authorId) REFERENCES author(id)
            );`;
        })
        .withInsertDataCallback(async (data) => {
            sql`INSERT INTO authorBook (bookId, authorId)
             VALUES (${data.bookId}, ${data.authorId})
             ON CONFLICT DO NOTHING;`;
        })
        .build();

    await authorBookTable.createTable();
    await userBookTable.insertData();

    await sql.end();
}

main().catch((err) => {
    console.error("An error occurred while attempting to seed the DB:", err);
});
