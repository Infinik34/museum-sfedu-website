"use client";

import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  id: number | string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  imageAlt?: string;
  slug?: string;
}

export default function NewsCard({
  id,
  title,
  description,
  date,
  imageUrl,
  imageAlt = "Новость",
  slug,
}: NewsCardProps) {
  const href = slug ? `/news/${slug}` : `/news/${id}`;

  return (
    <Link href={href} className="block group">
      <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300">
        <div className="flex flex-col md:flex-row">
          {/* Левая колонка: фото */}
          <div className="md:w-1/3 lg:w-1/4 relative h-56 md:h-auto overflow-hidden bg-gray-800">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            {/* Бейдж с датой (мобильная версия) */}
            <div className="absolute top-3 left-3 md:hidden bg-blue-600 text-white text-xs px-2 py-1 rounded-lg">
              {date}
            </div>
          </div>

          {/* Правая колонка: контент */}
          <div className="md:w-2/3 lg:w-3/4 p-6 md:p-8">
            {/* Дата (десктопная версия) */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-3">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date}</span>
            </div>

            {/* Заголовок */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h3>

            {/* Описание */}
            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
              {description}
            </p>

            {/* Кнопка "Читать далее" */}
            <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
              <span>Читать далее</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}