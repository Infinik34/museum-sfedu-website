import Link from 'next/link';
import { Card } from '@heroui/react';
import { PersonalityItem } from '@/lib/strapiApi';

interface PersonalityCardProps {
  item: PersonalityItem;
  baseUrl?: string;
}

export default function PersonalityCard({ item, baseUrl }: PersonalityCardProps) {
  const imageUrl = item.image?.url
    ? `${baseUrl || process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.url}`
    : '/placeholder.png';

  return (
    <Link
      href={`/exhibition/personalities/${item.slug}`}
      className="group block h-full"
    >
      <Card className="bg-museum-dark p-0!">
        <Card.Content className="p-0! border border-gray-800 rounded-2xl overflow-hidden hover:border-museum-blue/50 hover:shadow-xl hover:shadow-museum-blue/10 transition-all duration-300 h-full flex flex-col">

          {/* Изображение с эффектом при наведении */}
          <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-900 p-4">
            <img
              src={imageUrl}
              alt={item.image?.alternativeText || item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              width={400}
              height={300}
            />
            <div className="absolute inset-0 bg-museum-dark/0 group-hover:bg-museum-dark/10 transition-colors duration-300" />
          </div>

          {/* Контент карточки */}
          <div className="p-5 flex flex-col flex-1">
            {/* Заголовок */}
            <h3 className="text-lg font-bold text-white group-hover:text-museum-blue transition-colors mb-2 line-clamp-2 min-h-[3.5rem]">
              {item.name}
            </h3>

            {/* Описание */}
            <p className="text-sm text-museum-subtext line-clamp-3 leading-relaxed flex-1">
              {item.description}
            </p>

            {/* Футер карточки с кнопкой */}
            <div className="mt-4 pt-3 border-t border-gray-800 flex items-center gap-2 text-museum-blue text-sm font-medium group-hover:gap-3 transition-all">
              Подробнее
            </div>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
}