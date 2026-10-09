import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getNewsBySlug } from '@/lib/strapiApi';

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const newsItem = await getNewsBySlug(slug);

  if (!newsItem) {
    console.warn(`Новость со slug "${slug}" не найдена в базе.`);
    notFound();
  }

  const { title, excerpt, content, publishedAt, image } = newsItem;

  const imageUrl = image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`
    : '/placeholder.png';

  return (
    <article className="min-h-screen bg-museum-dark text-white px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Шапка */}
        <header className="mb-8 md:mb-12">
          <time className="text-museum-blue text-sm font-semibold tracking-wide uppercase">
            {new Intl.DateTimeFormat('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'Europe/Moscow'
            }).format(new Date(publishedAt))}
          </time>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-3 mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">{excerpt}</p>
        </header>

        {/* Главное фото */}
        {image && (
          <figure className="relative bg-museum-dark aspect-4/3 rounded-2xl overflow-hidden border border-gray-800 mb-10 shadow-2xl shadow-museum-blue/5">
            <img
              src={imageUrl}
              alt={image.alternativeText || title}
              className="absolute inset-0 h-full w-full object-container"
            />
          </figure>
        )}

        {/* Контент новости */}
        <div
          className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content?.trim() || '<p>Описание отсутствует.</p>' }}
        />

        {/* Кнопка назад */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <Link href="/news" className="inline-flex items-center gap-2 text-museum-blue hover:text-white transition-colors font-medium">
            Вернуться к списку новостей
          </Link>
        </div>
      </div>
    </article>
  );
}