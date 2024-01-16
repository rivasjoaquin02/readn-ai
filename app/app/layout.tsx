import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/components/ui/fonts";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { SideNav } from "@/components/sidenav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavBar } from "@/components/navbar";

export const metadata: Metadata = {
    title: {
        template: "%s | Readn-ai",
        default: "Readn-ai"
    },
    description: "The place to read and ask questions - ai powered",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={cn("flex h-screen flex-row justify-start antialiased", inter.className)}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider delayDuration={0}>
                        <div>
                            <SideNav />
                        </div>
                        <div className="h-screen flex flex-col gap-10 flex-grow p-4 overflow-y-auto">
                            <header className="flex justify-between">
                                <NavBar />
                            </header>
                            {children}
                        </div>
                    </TooltipProvider>
                </ ThemeProvider>
            </body>
        </html>
    );
}

