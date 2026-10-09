import { getStaff } from '@/lib/strapiApi';
import { Card } from '@heroui/react';
import Link from 'next/link';


export default async function StaffPage() {
  const { data: staff } = await getStaff()

  return (
    <main className="min-h-screen bg-museum-navy">
      {/* Хедер страницы */}
      <section className="bg-museum-dark text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/"
              className="text-museum-blue hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              На главную
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif">
            СОТРУДНИКИ МУЗЕЯ
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Команда профессионалов, сохраняющих и развивающих наследие науки и техники
          </p>
        </div>
      </section>

      {/* Сетка сотрудников */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {staff.map((person) => (
              <Card key={person.id} className="h-full">
                <Card.Content
                  className="bg-white/95 border border-gray-200 p-6 hover:border-museum-blue/40 hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="flex flex-col items-center text-center">
                    {/* Аватар с инициалами */}
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-museum-blue to-museum-navy flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">
                      {getInitials(person.name)}
                    </div>

                    {/* Имя и должность */}
                    <h3 className="font-bold text-lg text-museum-dark mb-1">
                      {person.name}
                    </h3>
                    <p className="text-museum-blue font-medium text-sm mb-4">
                      {person.position}
                    </p>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Заглушка если нет фото (поменять на фото-заглушку)
function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0]?.slice(0, 2).toUpperCase() || 'СМ';
}