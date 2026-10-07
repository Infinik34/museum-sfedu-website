// app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import mus_ins from '@/../public/museum_inside.jpg';

export const metadata: Metadata = {
  title: 'О нас | Политехнический музей ЮФУ',
  description: 'Информация о музее, экспозиции, экскурсиях и режиме работы.',
};

// Данные вынесены отдельно → легко перенести в Strapi позже
const aboutSections = [
  {
    title: 'Что у нас есть',
    text: 'Экспозиция охватывает несколько направлений: от классической механики и электротехники до вычислительной техники и робототехники. Среди экспонатов — действующие модели, исторические приборы и интерактивные установки, которые можно запустить самому.'
  },
  {
    title: 'Чем мы занимаемся',
    text: 'Мы проводим экскурсии для школьников, студентов и всех, кому интересно, как устроен мир техники. Регулярно организуем лекции, мастер-классы и временные выставки. Наша задача — не просто показать экспонат, а объяснить, как он работает и почему это важно.'
  },
  {
    title: 'Для кого',
    text: 'Для школьников, которые выбирают профессию. Для студентов, которым нужно увидеть теорию на практике. Для взрослых, которые хотят провести выходной не только интересно, но и с пользой. Для всех, кто любопытен.'
  },
  {
    title: 'Как мы работаем',
    text: 'Экскурсии проводятся по предварительной записи. Мы стараемся, чтобы каждая группа получила столько времени и внимания, сколько нужно. Расписание и запись доступны на сайте и по телефону.'
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-museum-dark text-white">
      <section className="relative py-28 md:py-36 px-6 overflow-hidden">

        {/* Контент */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-14">
          
          {/* Заголовок и вступление */}
          <header className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-white leading-tight tracking-tight">
              О нас
            </h1>
            <p className="text-lg md:text-xl text-white-800 leading-relaxed max-w-3xl">
              Политехнический музей ЮФУ — это пространство, где наука и техника перестают быть абстрактными. Здесь можно увидеть, потрогать и понять то, о чём говорят на лекциях.
            </p>
          </header>

          {/* Сетка разделов */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 pt-8">
            {aboutSections.map((section, i) => (
              <div key={i} className="space-y-4">
                <h2 className="text-xl font-semibold font-serif text-white border-b border-white pb-3">
                  {section.title}
                </h2>
                <p className="text-white leading-relaxed text-base">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}