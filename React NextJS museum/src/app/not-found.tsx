import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="min-h-[calc(100vh-200px)] bg-museum-navy/20 flex items-center justify-center px-4">
            <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="text-9xl font-bold text-gray-200 mb-4 select-none">404</div>
                <p className="text-xl text-gray-600 mb-3">Страница не найдена</p>
                <p className="text-gray-400 mb-8">Извините, такой страницы не существует</p>
                <Link
                    href="/"
                    className="px-4 flex items-center justify-center py-2 rounded-sm transition-all bg-[#0d183b] text-lg text-gray-100 border border-blue-800 hover:bg-museum-navy"
                >
                    Вернуться на главную
                </Link>
            </div>
        </div>
    )
}