import Link from 'next/link';
import Image from 'next/image';

// Используем тот же тип, что и на странице новостей (или импортируем его)
type NewsItem = {
    documentId: string;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    image?: {
        url: string;
        alternativeText?: string | null;
    } | null;
};

export default function NewsCardHome({ item }: { item: NewsItem }) {
    // Логика формирования URL картинки (защита от склейки полного пути)
    const imageUrl = item.image?.url
        ? item.image.url.startsWith('http')
            ? item.image.url
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.url}`
        : '/placeholder.png';

    return (
        <Link href={`/news/${item.slug}`} className="group block h-full">
            <div className="flex flex-col h-full bg-museum-dark border border-gray-800 rounded-2xl overflow-hidden hover:border-museum-blue/50 transition-all duration-300 hover:shadow-xl hover:shadow-museum-blue/10">

                {/* Фото (высокое) */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-900">
                    <Image
                        src={imageUrl}
                        alt={item.image?.alternativeText || item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Легкое затемнение при наведении, чтобы текст кнопки "Читать" смотрелся лучше */}
                    <div className="absolute inset-0 bg-museum-dark/0 group-hover:bg-museum-dark/10 transition-colors duration-300" />
                </div>

                {/* Текстовая часть */}
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-museum-blue transition-colors line-clamp-2">
                        {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                        {item.excerpt || 'Описание отсутствует.'}
                    </p>

                    {/* Индикатор кликабельности снизу */}
                    <div className="mt-5 flex items-center gap-2 text-museum-blue text-sm font-medium group-hover:gap-3 transition-all">
                        Читать далее
                    </div>
                </div>
            </div>
        </Link>
    );
}