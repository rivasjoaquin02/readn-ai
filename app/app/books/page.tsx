import { ListBooks } from "@/components/list-books";


export default async function Page() {

    return <main>

        <ul className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <ListBooks />
        </ul>

    </main>
}
