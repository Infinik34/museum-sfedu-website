// app/history/page.tsx
import { getHistoryPageSettings } from '@/lib/strapiApi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'История музея',
  description: 'История Политехнического музея ЮФУ в Таганроге',
};

type StrapiSettingsHistory = {
  text: string;
}

export default async function HistoryPage() {
  const settings: StrapiSettingsHistory = await getHistoryPageSettings();

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