import { getBookById } from "@/lib/data";


export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const book = await getBookById(id);

    return <main>{book.title}</main>
}
