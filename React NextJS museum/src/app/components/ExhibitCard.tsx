import Link from 'next/link';
import { Card as HeroCard } from '@heroui/react';
import { ExhibitItem } from '@/lib/strapiApi';

interface ExhibitCardProps {
  item: ExhibitItem;
  baseUrl?: string; // Опционально: если нужно переопределить базовый URL для картинок
}

export default function ExhibitCard({ item, baseUrl }: ExhibitCardProps) {
  // Логика получения URL картинки (твой проверенный паттерн)
  const imageUrl = item.image?.url
    ? `${baseUrl || process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.url}`
    : '/placeholder.png';

  return (
    <Link
      href={`/exhibition/${item.slug}`}
      className="group block h-full"
    >
      <HeroCard className="bg-museum-dark border border-gray-800 overflow-hidden hover:border-museum-blue/50 hover:shadow-xl hover:shadow-museum-blue/10 transition-all duration-300 h-full flex flex-col">
        
        {/* Изображение с эффектом при наведении */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
          <img
            src={imageUrl}
            alt={item.image?.alternativeText || item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            width={400}
            height={300}
          />
          {/* Затемнение при наведении */}
          <div className="absolute inset-0 bg-gradient-to-t from-museum-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Контент карточки */}
        <div className="p-5 flex flex-col flex-1">
          {/* Заголовок */}
          <h3 className="text-lg font-bold text-white group-hover:text-museum-blue transition-colors mb-2 line-clamp-2 min-h-[3.5rem]">
            {item.title}
          </h3>
          
          {/* Описание */}
          <p className="text-sm text-museum-subtext line-clamp-3 leading-relaxed flex-1">
            {item.description}
          </p>

          {/* Футер карточки с кнопкой */}
          <div className="mt-4 pt-3 border-t border-gray-800 flex items-center gap-2 text-museum-blue text-sm font-medium group-hover:gap-3 transition-all">
            Подробнее
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </HeroCard>
    </Link>
  );
}