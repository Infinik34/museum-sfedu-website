import Link from 'next/link';
import { getExhibitionPageSettings } from '@/lib/strapiApi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

type StrapiSettingsExhibition = {
    text: string;
}

export default async function ExhibitionPage() {
    const settings: StrapiSettingsExhibition = await getExhibitionPageSettings();

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
                <section className="flex flex-col items-center justify-center py-5 text-center">
                    <h2 className="m-10 max-w-2xl text-xl md:text-2xl font-bold">
                        Также исследовать нашу экспозицию можно на платформе Artefact по QR-коду ниже
                    </h2>
                    <div className="w-64 h-64 bg-[url('/qrsvg.jpg')] bg-cover bg-center bg-no-repeat" />
                </section>
            </article>
            {/* <img src="/qrsvg.jpg" className='w-55 h-55'/> */}
        </main>
    );
}