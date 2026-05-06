import { Footer } from "./Footer";
import { Navbar } from "./NavBar";

interface LayoutProps { children: React.ReactNode }

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 mx-auto w-full max-w-screen-xl px-6 py-8">
                {children}
            </main>
            <Footer />
        </div>
    )
}