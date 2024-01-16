import { Chat } from "@/components/chat/chat";

export default function Page() {

    return <main className="h-full">
        <div className="w-full h-full gap-4 mx-auto max-w-screen-xl px-4 flex flex-col stretch">
            <Chat />
        </div>
    </main>
}
