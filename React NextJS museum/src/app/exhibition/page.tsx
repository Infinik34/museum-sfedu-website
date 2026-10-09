import { getExhibits, getCategories } from '@/lib/strapiApi';
import ExhibitsClient from '@/app/components/ExhibitsClient';
import Link from 'next/link';

export default async function ExhibitsPage({ searchParams }: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams;
  const slugs = category ? category.split(',').filter(Boolean) : [];

  //  Параллельная загрузка: не ждем последовательно
  const [exhibitsRes, categoriesRes] = await Promise.all([
    getExhibits(slugs),
    getCategories()
  ]);

  return (
    <main className="min-h-screen bg-museum-dark text-museum-text">
      <section className="bg-gradient-to-b from-museum-navy/30 to-transparent border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-[15px] min-[1312]:px-0 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Экспонаты музея
          </h1>
          <p className="text-museum-subtext text-lg md:text-xl max-w-3xl leading-relaxed">
            Уникальная коллекция устройств, приборов и механизмов, отражающая историю развития науки и техники
          </p>
          <Link
            href='/booking'
            className="inline-block bg-museum-navy/60 hover:bg-teal-500/20 text-teal-400 border border-teal-500/40 hover:border-teal-400 px-6 py-3 rounded-lg mt-8 cursor-pointer transition-all duration-300"
          >
            Посетить музей{/*Записаться на экскурсию*/}
          </Link>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <ExhibitsClient
            initialExhibits={exhibitsRes.data}
            categories={categoriesRes.data}
          />
        </div>
      </section>
    </main>
  );
}