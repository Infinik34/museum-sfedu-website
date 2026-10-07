// app/news/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { getNews, getNewsPageSettings } from '@/lib/strapiApi';


type StrapiNews = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  image: {
    url: string;
    alternativeText: string | null;
  } | null;
};

type StrapiResponse = {
  data: StrapiNews[];
  meta: {
    pagination: { page: number; pageSize: number; pageCount: number; total: number };
  };
};

type StrapiSettingsNews = {
  id: number;
  documentId: string;
  titleMainPage?: string;
  descriptionMainPage?: string;
  backgroundMainPage?: string;
  publishedAt?: string;
  titleDetailPage?: string;
  descriptionDetailPage?: string;
  backgroundDetailPage?: string;
  backgroundForTitleMainPage?: string;
};

function getStrapiMedia(url: string | null): string {
  if (!url) return '/placeholder.png';
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}



export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page = '1' } = await searchParams;
  const { data: news, meta } = await getNews(Number(page));
  const settings: StrapiSettingsNews = await getNewsPageSettings()
  return (

    // Если значения bg нет или пустая строка - по дефолту dark
    <div className={`min-h-screen bg-museum-${settings?.backgroundMainPage || 'dark'}`}>
      {/* Заголовок страницы */}
      {/* Если значения bg нет или пустая строка - по дефолту темно-синий с 20% прозрачности*/}
      <section className={`bg-museum-${settings?.backgroundForTitleMainPage || 'navy/20'} border-b border-gray-800`}>
        <div className="max-w-7xl mx-auto py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white mb-4">
            {/* Если значение заголовка не пришло - дефолтное значение (пустая строка может быть) */}
            {settings?.titleMainPage ?? 'НОВОСТИ МУЗЕЯ'}
          </h1>
          {/* Описание страницы */}
          <p className="text-gray-300 text-lg max-w-2xl">
            {/* Если значение описания не пришло - дефолтное значение (пустая строка может быть) */}
            {settings?.descriptionMainPage ?? 'Актуальные события, выставки и мероприятия'}
          </p>
        </div>
      </section>

      {/* Список новостей */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {news.map((item: StrapiNews) => {
            const { title, slug, excerpt, publishedAt, image } = item;

            // Собираем полный путь к картинке
            const imageUrl = image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`
              : '/placeholder.png';

            return (
              <article
                key={item.documentId}
                className='bg-museum-white/95 rounded-xl overflow-hidden border border-gray-200 hover:border-museum-blue/40 hover:shadow-xl hover:shadow-museum-blue/5 transition-all duration-300 group'
              >
                <Link href={`/news/${slug}`}>
                  <div className="md:flex">
                    {/* Изображение */}
                    <div className="md:w-1/3 relative overflow-hidden rounded-lg aspect-4/3">
                      <img
                        src={imageUrl}
                        alt={image?.alternativeText || title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Контент */}
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        {/* Дата */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(publishedAt).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>

                        {/* Заголовок */}
                        <h2 className='text-xl md:text-2xl font-bold text-museum-dark group-hover:text-museum-blue transition-colors mb-3 leading-tight'>
                          {title}
                        </h2>

                        {/* Описание */}
                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>
                      </div>

                      {/* Кнопка "Открыть новость" */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p
                          className="inline-flex items-center gap-2 text-museum-blue font-medium hover:gap-3 transition-all group/link"
                        >
                          Открыть новость
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>

            );
          })}

          {/* Пагинация */}
          <div className="flex justify-center gap-2 pt-8">
            {Number(page) > 1 && (
              <Link href={`/news?page=${Number(page) - 1}`}>
                <span className="px-6 py-3 rounded-lg bg-museum-blue text-white hover:bg-blue-600 transition-colors">
                  Назад
                </span>
              </Link>
            )}
            {Number(page) < meta.pagination.pageCount && (
              <Link href={`/news?page=${Number(page) + 1}`}>
                <span className="px-6 py-3 rounded-lg bg-museum-blue text-white hover:bg-blue-600 transition-colors">
                  Далее
                </span>              
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}