import postgres, { type Sql } from "postgres";
import bcrypt from "bcrypt";
import {
    users,
    books,
    authors,
    authorBook,
    userBook
} from "@/lib/placeholder-data";
import { env } from "@/lib/config";
import type {
    Book,
    User,
    Author,
    AuthorBook,
    UserBook
} from "@/lib/definitions";

// TODO: this functions are very similar

async function seedUsers(table: string, data: User[], sql: Sql) {
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
        const insertedTable = await sql`CREATE TABLE IF NOT EXISTS "user" (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );`;
        console.log(`Created table ${table}`);

        const insertedData = await Promise.all(
            data.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return sql`
                     INSERT INTO "user" (id, name, email, password)
                     VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                     ON CONFLICT (id) DO NOTHING;`;
            })
        );
        console.log(
            `Seeded ${insertedData.length} of ${data.length} from table ${table}`
        );

        return { table: insertedTable, data: insertedData };
    } catch (err) {
        console.error(`Error seeding table ${table}: `, err);
        throw err;
    }
}

async function seedBooks(table: string, data: Book[], sql: Sql) {
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
        const insertedTable = await sql`CREATE TABLE IF NOT EXISTS book (
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
        console.log(`Created table ${table}`);

        const insertedData = await Promise.all(
            data.map(async (book) => {
                return sql`INSERT INTO book (id, title, pages, genre, cover, synopsis, dateAdded, year, ISBN)
                     VALUES (
                        ${book.id}, 
                        ${book.title}, 
                        ${book.pages}, 
                        ${book.genre}, 
                        ${book.cover}, 
                        ${book.synopsis},
                        ${book.dateAdded},
                        ${book.year}, 
                        ${book.ISBN})
                     ON CONFLICT (id) DO NOTHING;`;
            })
        );
        console.log(
            `Seeded ${insertedData.length} of ${data.length} from table ${table}`
        );

        return { table: insertedTable, data: insertedData };
    } catch (err) {
        console.error(`Error seeding table ${table}: `, err);
        throw err;
    }
}

async function seedUserBook(table: string, data: UserBook[], sql: Sql) {
    try {
        const createdTable = await sql`CREATE TABLE IF NOT EXISTS userBook (
                userId UUID NOT NULL,
                bookId UUID NOT NULL,
                current_page INT DEFAULT 0,
                rating INT,
                favorite BOOL,
                review TEXT,
                CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES "user"(id),
                CONSTRAINT fk_book FOREIGN KEY (bookId) REFERENCES book(id)
            );`;
        console.log(`Created table ${table}`);

        const insertedData = await Promise.all(
            data.map(async (userBook) => {
                return sql`INSERT INTO userBook (userId, bookId, current_page, rating, favorite, review)
                     VALUES (
                        ${userBook.userId},
                        ${userBook.bookId},
                        ${userBook.current_page},
                        ${userBook.rating},
                        ${userBook.favorite},
                        ${userBook.review})
                     ON CONFLICT DO NOTHING;`;
            })
        );
        console.log(
            `Seeded ${insertedData.length} of ${data.length} from table ${table}`
        );

        return { table: createdTable, data: insertedData };
    } catch (err) {
        console.error(`Error seeding table ${table}: `, err);
        throw err;
    }
}

async function seedAuthors(table: string, data: Author[], sql: Sql) {
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
        const createdTable = await sql`CREATE TABLE IF NOT EXISTS author (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255)
            );`;
        console.log(`Created table ${table}`);

        const insertedData = await Promise.all(
            data.map(async (author) => {
                return sql`INSERT INTO author (id, name)
                     VALUES (${author.id}, ${author.name})
                     ON CONFLICT (id) DO NOTHING;`;
            })
        );
        console.log(
            `Seeded ${insertedData.length} of ${data.length} from table ${table}`
        );

        return { table: createdTable, data: insertedData };
    } catch (err) {
        console.error(`Error seeding table ${table}: `, err);
        throw err;
    }
}

async function seedAuthorBook(table: string, data: AuthorBook[], sql: Sql) {
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
        const createdTable = await sql`CREATE TABLE IF NOT EXISTS authorBook (
                bookId UUID NOT NULL,
                authorId UUID NOT NULL,
                CONSTRAINT fk_book FOREIGN KEY (bookId) REFERENCES book(id),
                CONSTRAINT fk_author FOREIGN KEY (authorId) REFERENCES author(id)
            );`;
        console.log(`Created table ${table}`);

        const insertedData = await Promise.all(
            data.map(async (authorBook) => {
                return sql`INSERT INTO authorBook (bookId, authorId)
                     VALUES (${authorBook.bookId}, ${authorBook.authorId})
                     ON CONFLICT DO NOTHING;`;
            })
        );
        console.log(
            `Seeded ${insertedData.length} of ${data.length} from table ${table}`
        );

        return { table: createdTable, data: insertedData };
    } catch (err) {
        console.error(`Error seeding table ${table}: `, err);
        throw err;
    }
}

async function main() {
    const sql = postgres({
        host: env.PG_HOST,
        port: env.PG_PORT,
        user: env.PG_USER,
        password: env.PG_PASS,
        database: env.PG_DATABASE
    });

    await seedUsers("user", users, sql);
    await seedBooks("book", books, sql);
    await seedUserBook("userBook", userBook, sql);
    await seedAuthors("author", authors, sql);
    await seedAuthorBook("authorBook", authorBook, sql);

    await sql.end();
}

main().catch((err) => {
    console.error("An error occurred while attempting to seed the DB:", err);
});
