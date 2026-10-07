import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
            <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="text-9xl font-bold text-gray-200 mb-4 select-none">404</div>
                <p className="text-xl text-gray-600 mb-3">Страница не найдена</p>
                <p className="text-gray-400 mb-8">Извините, такой страницы не существует</p>
                <Link
                    href="/"
                    className="inline-block px-6 py-2.5 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200"
                >
                    Вернуться на главную
                </Link>
            </div>
        </div>
    )
}