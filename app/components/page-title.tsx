import { cn } from "@/lib/utils";
import { goudy } from "@/components/ui/fonts";
import type { ReactNode } from "react";

type Variants = "main" | "sub" | "mini";
type PageTitleProps = {
    variant: Variants;
    children: ReactNode;
};

type Header = Record<Variants, (text: ReactNode) => ReactNode>;

export function PageTitle({ variant, children }: PageTitleProps) {
    const className = cn(`leading-tight font-bold ${goudy.className}`, {
        "text-4xl md:text-5xl lg:text-6xl": variant === "main",
        "text-2xl md:text-3xl lg:text-4xl": variant === "sub",
        "text-lg md:text-xl lg:text-2xl": variant === "mini"
    });

    const header: Header = {
        main: (text) => <h1 className={className}>{text}</h1>,
        sub: (text) => <h2 className={className}>{text}</h2>,
        mini: (text) => <h3 className={className}>{text}</h3>
    };

    const component = header[variant];

    return component(children);
}
