'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ExhibitionLayout({ children }: { children: React.ReactNode }) {
    // const pathname = usePathname();

    // const isExhibits = pathname.includes('/exhibits');
    // const isPersonalities = pathname.includes('/personalities');

    return (
        <div className="min-h-screen bg-museum-dark text-white">

            {/* Шапка раздела */}
            <header className="border-b border-gray-800 top-16 z-40 bg-museum-navy/25">
                <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6 justify-center items-center">

                    <nav className="flex gap-4 justify-center">
                        <Link
                            href="/exhibition/exhibits"
                            className={`px-4 w-35 h-13 flex items-center justify-center py-2 rounded-sm transition-all bg-[#0d183b] text-lg text-gray-100 border border-blue-800 hover:bg-museum-navy`}
                        >
                            Экспонаты
                        </Link>
                        <Link
                            href="/exhibition/personalities"
                            className={`px-4 w-35 h-13 flex items-center justify-center py-2 rounded-sm transition-all bg-[#0d183b] text-lg text-gray-100 border border-blue-800 hover:bg-museum-navy`}
                        >
                            Персоналии
                        </Link>
                    </nav>

                </div>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
}