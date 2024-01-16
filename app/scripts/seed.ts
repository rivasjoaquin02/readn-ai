import { Client } from "pg";
import bcrypt from "bcrypt";
import {
    users,
    books,
    authors,
    book_author,
    user_book
} from "@/lib/placeholder-data";
import { env } from "@/lib/config";
import type {
    Book,
    User,
    Author,
    BookAuthor,
    UserBook
} from "@/lib/definitions";

// TODO: this functions are very similar

async function seedUsers(client: Client) {
    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        // Create "user" table if it doesn't exist
        const createdTable = await client.query(
            `CREATE TABLE IF NOT EXISTS "user" (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );`
        );
        console.log("Created 'user' table");

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user: User) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.query(
                    `INSERT INTO "user" (id, name, email, password)
                     VALUES ($1, $2, $3, $4)
                     ON CONFLICT (id) DO NOTHING;`,
                    [user.id, user.name, user.email, hashedPassword]
                );
            })
        );
        console.log(`Seeded ${insertedUsers.length} of ${users.length} users`);

        return {
            table: createdTable,
            users: insertedUsers
        };
    } catch (err) {
        console.error("Error seeding users: ", err);
        throw err;
    }
}

async function seedBooks(client: Client) {
    try {
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        // Create "book" table if it doesn't exist
        const createdBookTable = await client.query(
            `CREATE TABLE IF NOT EXISTS book (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title VARCHAR(255),
                pages INT NOT NULL,
                genre VARCHAR(255),
                cover TEXT,
                synopsis TEXT,
                year INT,
                ISBN VARCHAR(20)
            );`
        );
        console.log("Created 'book' table");

        // Insert data into the "book" table
        const insertedBooks = await Promise.all(
            books.map(async (book: Book) => {
                return client.query(
                    `INSERT INTO book (id, title, pages, genre, cover, synopsis, year, ISBN)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                     ON CONFLICT (id) DO NOTHING;`,
                    [
                        book.id,
                        book.title,
                        book.pages,
                        book.genre,
                        book.cover,
                        book.synopsis,
                        book.year,
                        book.ISBN
                    ]
                );
            })
        );
        console.log(`Seeded ${insertedBooks.length} of ${books.length} books`);

        return {
            createdTable: createdBookTable,
            books: insertedBooks
        };
    } catch (err) {
        console.error("Error seeding books: ", err);
        throw err;
    }
}

async function seedUserBook(client: Client) {
    try {
        // Create "user" table if it doesn't exist
        const createdTable = await client.query(
            `CREATE TABLE IF NOT EXISTS "user_book" (
                user_id UUID NOT NULL,
                book_id UUID NOT NULL,
                current_page INT DEFAULT 0,
                rating INT,
                favorite BOOL,
                review TEXT,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id),
                CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES book(id)
            );`
        );
        console.log("Created 'user_book' table");

        // Insert data into the "user_book" table
        const insertedUserBook = await Promise.all(
            user_book.map(async (userBook: UserBook) => {
                return client.query(
                    `INSERT INTO user_book (user_id, book_id, current_page, rating, favorite, review)
                     VALUES ($1, $2, $3, $4, $5, $6)
                     ON CONFLICT DO NOTHING;`,
                    [
                        userBook.user_id,
                        userBook.book_id,
                        userBook.current_page,
                        userBook.rating,
                        userBook.favorite,
                        userBook.review
                    ]
                );
            })
        );
        console.log(`Seeded ${insertedUserBook.length} of ${user_book.length} users`);

        return {
            table: createdTable,
            users: insertedUserBook
        };
    } catch (err) {
        console.error("Error seeding userBook: ", err);
        throw err;
    }
}

async function seedAuthors(client: Client) {
    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        // Create "author" table if it doesn't exist
        const createdAuthorTable = await client.query(
            `CREATE TABLE IF NOT EXISTS author (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255)
            );`
        );
        console.log("Created 'author' table");

        // Insert data into the "booke table
        const insertedAuthors = await Promise.all(
            authors.map(async (author: Author) => {
                return client.query(
                    `INSERT INTO author (id, name)
                     VALUES ($1, $2)
                     ON CONFLICT (id) DO NOTHING;`,
                    [author.id, author.name]
                );
            })
        );
        console.log(
            `Seeded ${insertedAuthors.length} of ${authors.length} authors`
        );

        return {
            createdTable: createdAuthorTable,
            authors: insertedAuthors
        };
    } catch (err) {
        console.error("Error seeding authors: ", err);
        throw err;
    }
}

async function seedBookAuthor(client: Client) {
    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        // Create "book_author" table if it doesn't exist
        const createdBookAuthorTable = await client.query(
            `CREATE TABLE IF NOT EXISTS book_author (
                book_id UUID NOT NULL,
                author_id UUID NOT NULL,
                CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES book(id),
                CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES author(id)
            );`
        );
        console.log("Created 'book_author' table");

        // Insert data into the "booke table
        const insertedBookAuthor = await Promise.all(
            book_author.map(async (bookAuthor: BookAuthor) => {
                return client.query<BookAuthor>(
                    `INSERT INTO book_author (book_id, author_id)
                     VALUES ($1, $2)
                     ON CONFLICT DO NOTHING;`,
                    [bookAuthor.book_id, bookAuthor.author_id]
                );
            })
        );
        console.log(
            `Seeded ${insertedBookAuthor.length} of ${book_author.length} book_author`
        );

        return {
            createdTable: createdBookAuthorTable,
            bookAuthors: insertedBookAuthor
        };
    } catch (err) {
        console.error("Error seeding bookAuthor: ", err);
        throw err;
    }
}

async function main() {
    const client = new Client({
        host: env.PG_HOST,
        port: env.PG_PORT,
        user: env.PG_USER,
        password: env.PG_PASS,
        database: env.PG_DATABASE
    });
    await client.connect();

    await seedUsers(client);
    await seedBooks(client);
    await seedUserBook(client)
    await seedAuthors(client);
    await seedBookAuthor(client);

    await client.end();
}

main().catch((err) => {
    console.error("An error occurred while attempting to seed the DB:", err);
});
