export const users = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "User",
        email: "admin@email.com",
        password: "123456",
    },
];

export const books = [
    {
        id: "e5bbd46b-5631-4e36-a808-77d5c2523666",
        title: "El Señor de los Anillos",
        pages: 1200,
        genre: "Fantasía",
        cover:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
        synopsis:
            "Una aventura épica en un mundo de fantasía llamado la Tierra Media.",
        year: 1954,
        ISBN: "978-0618640157",
    },
    {
        id: "d7f1540f-6833-4fcc-91b7-efe8add5c2db",
        title: "Juego de Tronos",
        pages: 694,
        genre: "Fantasía",
        cover:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1273763400i/8189620.jpg",
        synopsis:
            "En un reino donde las estaciones duran años, una batalla épica por el trono se desarrolla.",
        year: 1996,
        ISBN: "978-0553103540",
    },
    {
        id: "1c2619c6-9d78-43ff-bd50-4002e82a85ba",
        title: "Harry Potter y la piedra filosofal",
        pages: 223,
        genre: "Fantasía",
        cover:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1550337333i/15868.jpg",
        synopsis:
            "Un niño descubre que es un mago y comienza una aventura en una escuela de magia.",
        year: 1997,
        ISBN: "978-0747532699",
    },
];

export const authors = [
    {
        id: "99c7df1e-f377-48be-a1d1-04c26d708c7d",
        name: "J.R.R. Tolkien",
    },
    {
        id: "66f3c7e5-0ea2-4019-b565-6fd1a5ccd87d",
        name: "George R. R. Martin",
    },
    {
        id: "51c28dd3-64e4-4638-949b-863f32302423",
        name: "J.K. Rowling",
    },
];

export const book_author = [
    {
        book_id: "e5bbd46b-5631-4e36-a808-77d5c2523666",
        author_id: "99c7df1e-f377-48be-a1d1-04c26d708c7d",
    },
    {
        book_id: "d7f1540f-6833-4fcc-91b7-efe8add5c2db",
        author_id: "66f3c7e5-0ea2-4019-b565-6fd1a5ccd87d",
    },
    {
        book_id: "1c2619c6-9d78-43ff-bd50-4002e82a85ba",
        author_id: "51c28dd3-64e4-4638-949b-863f32302423",
    },
];

