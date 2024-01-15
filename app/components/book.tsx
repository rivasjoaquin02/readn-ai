import Image from "next/image"

export default function BookCard({ children }: { children: React.ReactNode }) {
    return <div className="cursor-pointer group flex flex-col justify-center items-center">
        {children}
    </div>
}

const BookImage = ({src, alt}: {src: string, alt: string}) => {
    //return <Image src={src} alt={alt} width={200} height={400} />
    return <div className="w-[200px] h-[280px] group-hover:scale-105 group-hover:rotate-2 transition-transform transform-gpu bg-yellow-600 shadow-2xl shadow-gray-700">{alt}</div>
}

const BookInfo = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col py-4">
        {children}
    </div>
}

const BookTitle = ({ children }: { children: React.ReactNode }) => {
    return <h3 className="font-semibold text-center">{children}</h3>
}

BookCard.Image = BookImage
BookCard.Info = BookInfo
BookCard.Title = BookTitle

