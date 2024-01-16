import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { toggleFavorite } from "@/lib/actions";
import { cn } from "@/lib/utils";

export default function BookCard({
    className,
    children
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn("flex flex-col items-center", className)}>
            {children}
        </div>
    );
}

const BookImage = ({
    id,
    href,
    src,
    alt,
    className
}: {
    id: string;
    href: string;
    src: string;
    alt: string;
    className?: string;
}) => {
    const userId = "550e8400-e29b-41d4-a716-446655440000";
    const toggleFavoriteWithId = toggleFavorite.bind(null, userId, id);

    return (
        <div
            className={cn(
                "relative h-full w-full transform-gpu transition-transform hover:-translate-y-1 hover:scale-105",
                className
            )}
        >
            <Link href={href}>
                <div className="h-full w-full cursor-pointer bg-yellow-600 shadow-2xl shadow-gray-700">
                    {/*<Image src={src} alt={alt} width={200} height={400} />*/}
                </div>
            </Link>
            <form action={toggleFavoriteWithId}>
                <Button
                    variant="outline"
                    className="absolute bottom-2 right-2 z-10 h-8 w-8 cursor-pointer p-0"
                >
                    <StarIcon className="h-4 w-4" />
                </Button>
            </form>
        </div>
    );
};

const BookInfo = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col py-4">{children}</div>;
};

const BookTitle = ({ children }: { children: React.ReactNode }) => {
    return <h3 className="text-center font-semibold">{children}</h3>;
};

BookCard.Image = BookImage;
BookCard.Info = BookInfo;
BookCard.Title = BookTitle;
