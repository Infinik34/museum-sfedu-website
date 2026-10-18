'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ExhibitItem, ExhibitCategoryItem } from '@/lib/strapiApi';
import ExhibitCard from './ExhibitCard';

interface ExhibitsClientProps {
  initialExhibits: ExhibitItem[];
  categories: ExhibitCategoryItem[];
}

export default function ExhibitsClient({ initialExhibits, categories }: ExhibitsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get('category') || '';
  const [activeSlugs, setActiveSlugs] = useState<string[]>(
    rawCategory ? rawCategory.split(',').filter(Boolean) : []
  );

  const [showMore, setShowMore] = useState(false);

  const toggleCategory = (slug: string) => {
    const newSlugs = activeSlugs.includes(slug)
      ? activeSlugs.filter(s => s !== slug)
      : [...activeSlugs, slug];

    setActiveSlugs(newSlugs);

    const params = new URLSearchParams(searchParams.toString());
    if (newSlugs.length === 0) {
      params.delete('category');
    } else {
      params.set('category', newSlugs.join(','));
    }

    const queryString = params.toString();
    const url = queryString ? `/exhibition/exhibits?${queryString}` : '/exhibition/exhibits';

    router.push(url, { scroll: false });

  };

  const clearFilters = () => {
    setActiveSlugs([]);
    router.push('/exhibition/exhibits');
  };

  const mainCategories = categories.filter(c => c.isMain);

  const otherCategories = categories.filter(c => !c.isMain);

  const getButtonClass = (slug: string) => {
    const isActive = activeSlugs.includes(slug);
    return `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${isActive
        ? 'bg-museum-blue text-white'
        : 'bg-museum-navy text-museum-text hover:bg-museum-blue/30 hover:text-white'
      }`;
  };

  return (
    <div>
      {/* Фильтры */}
      <div className="flex gap-2 mb-8 flex-wrap items-center">
        {/* Кнопка "Все" */}
        <button
          onClick={clearFilters}
          className={getButtonClass('all')}
        >
          Все
        </button>

        {/* Основные категории */}
        {mainCategories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => toggleCategory(cat.slug)}
            className={getButtonClass(cat.slug)}
          >
            {cat.name}
          </button>
        ))}

        {/* Кнопка "Ещё" */}
        {otherCategories.length > 0 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-3 py-2 text-sm text-museum-subtext hover:text-white transition-colors cursor-pointer"
          >
            {showMore ? 'Скрыть' : `Ещё (${otherCategories.length})`}
          </button>
        )}
      </div>

      {/* Второстепенные категории */}
      {showMore && (
        <div className="flex gap-2 mb-8 flex-wrap pt-2 border-t border-gray-800/50">
          {otherCategories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => toggleCategory(cat.slug)}
              className={getButtonClass(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Сетка или пустое состояние */}
      {initialExhibits.length === 0 ? (
        <div className="text-center py-16 text-museum-subtext">
          <p className="text-lg mb-2">Экспонаты не найдены</p>
          <p className="text-sm">Попробуйте выбрать другую категорию или сбросить фильтр</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-museum-blue text-white rounded hover:opacity-90 transition cursor-pointer"
          >
            Показать все
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {initialExhibits.map((item) => (
            <ExhibitCard key={item.documentId} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}