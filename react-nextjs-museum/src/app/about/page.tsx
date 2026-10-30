import { Metadata } from 'next';
import { getAboutPageSettings } from '@/lib/strapiApi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';


export const metadata: Metadata = {
  title: 'О нас',
  description: 'Информация о музее, экспозиции, экскурсиях и режиме работы.',
};

type StrapiSettingsAbout = {
    text: string;
}

export default async function ExhibitionPage() {
    const settings: StrapiSettingsAbout = await getAboutPageSettings();

    return (
        <main className="min-h-screen bg-museum-dark text-museum-text">
            <article className="max-w-4xl mx-auto px-4 py-16">

                {/* Контент из Strapi */}
                {settings?.text && (
                    <div className="prose prose-invert max-w-none text-gray-300 
                        [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white
                        [&_a]:text-teal-400 hover:[&_a]:underline">
                        <BlocksRenderer content={settings.text as any} />
                    </div>
                )}

            </article>
        </main>
    );
}