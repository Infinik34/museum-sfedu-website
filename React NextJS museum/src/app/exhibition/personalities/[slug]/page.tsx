// app/exhibition/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPersonalityBySlug, PersonalityCategoryItem, PersonalityItem } from '@/lib/strapiApi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default async function PersonalityPage({ params }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    const exhibit: PersonalityItem = await getPersonalityBySlug(slug);

    if (!exhibit) {
        notFound();
    }

    // Формируем URL изображения
    const imageUrl = exhibit.image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${exhibit.image.url}`
        : '/placeholder.png';

    return (
        <main className="min-h-screen bg-museum-dark text-museum-text">

            <div className="transition-colors bg-gradient-to-b from-[#0F1930] to-[#0d1529]">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <Link
                        href="/exhibition/personalities"
                        className="inline-flex items-center gap-2 text-lg text-museum-blue transition-colors"
                    >
                        Назад к персоналиям
                    </Link>
                </div>
            </div>

            {/* Контент экспоната */}
            <article className="max-w-5xl mx-auto px-4 py-12">

                {/* Заголовок и мета */}
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        {exhibit.name}
                    </h1>

                    {/* Категории */}
                    {exhibit.categories && exhibit.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {exhibit.categories.map((cat: PersonalityCategoryItem) => (
                                <span
                                    key={cat.slug}
                                    className="px-3 py-1 bg-museum-navy/50 text-museum-subtext text-xs rounded border border-gray-700/50"
                                >
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                    )}

                </header>

                {/* Изображение */}
                <figure className="mb-10 rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
                    <img
                        src={imageUrl}
                        alt={exhibit.image?.alternativeText || exhibit.name}
                        className="w-full h-auto object-contain max-h-[600px]"
                        loading="eager"
                    />
                </figure>

                {/* Описание */}
                <div className="prose prose-invert max-w-none">
                    {/* Краткое описание */}
                    {exhibit.description && (
                        <p className="text-lg text-museum-text leading-relaxed mb-6">
                            {exhibit.description}
                        </p>
                    )}

                    {/* Полное описание */}
                    {exhibit.fullDescription && (
                        <div className="prose prose-invert max-w-none text-gray-300 
                  [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white
                  [&_a]:text-teal-400 hover:[&_a]:underline">
                            <BlocksRenderer content={exhibit.fullDescription as any} />
                        </div>
                    )}
                </div>

            </article>
        </main>
    );
}