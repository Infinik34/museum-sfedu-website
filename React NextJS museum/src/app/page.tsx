`use client`
import { Button, Card } from "@heroui/react";
import Link from "next/link";
import mus_ins from '@/../public/museum_inside.jpg'
import Image from "next/image";
import { getMainPageSettings } from "@/lib/strapiApi";

type StrapiSettingsMain = {
  titleWhite?: string;
  titleBlue?: string;
  excerpt?: string;
  description?: string;
  backgroundMain?: string;
}



export default async function Home() {
  const settings: StrapiSettingsMain = await getMainPageSettings()
  return (
    <main className="min-h-screen bg-museum-dark text-white selection:bg-museum-blue/30">
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Фон */}
        <div className="absolute inset-0 z-0">
          {/* <Image
            src={mus_ins}
            alt="Фото изнутри"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover opacity-100"
            priority
          /> */}
          <div className="absolute inset-0 bg-linear-to-b from-museum-dark via-museum-dark/95 to-museum-dark" />
        </div>

        {/* Пятна */}
        <div className="" /> {/*absolute top-20 left-10 w-72 h-72 bg-museum-blue/10 rounded-full blur-3xl*/}
        <div className="" /> {/*absolute bottom-20 right-10 w-96 h-96 bg-museum-blue/5 rounded-full blur-3xl*/}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-museum-blue/20 shadow-2xl shadow-museum-blue/10 h-[500px] lg:h-[835px]">
              <Image
                src={mus_ins}
                alt="Интерьер Политехнического музея"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-museum-dark/40 to-transparent" />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif leading-tight tracking-tight">
                {settings?.titleWhite}
                <span className="text-museum-blue block mt-2">
                  {settings?.titleBlue}
                </span>
              </h1>

              <blockquote className="text-lg md:text-xl text-gray-300 border-l-4 border-museum-blue pl-6 py-2 bg-museum-navy/20 rounded-r-lg">
                {settings.excerpt}
              </blockquote>
            </div>

            <div className="space-y-5 text-gray-300 leading-relaxed">
              <p>
                Экспозиция музея отражает направления института в области науки и техники,
                по которым идёт подготовка наших будущих специалистов:
              </p>

              <ul className="grid sm:grid-cols-2 gap-2 pl-1">
                {[
                  'радиотехника, автоматика и ВТ',
                  'авиация и космонавтика',
                  'электроника и связь',
                  'телевидение',
                  'электро-гидроаккустическая техника',
                  'медицинская техника'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-museum-blue text-lg">·</span>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="pt-4 border-t border-gray-700">
                {settings?.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/exhibition">
                <Button variant="primary" size="lg" className="px-8 font-semibold">
                  Экспозиция музея
                </Button>
              </Link>

              <Link href="/history">
                <Button variant="outline" size="lg" className="px-10 font-bold border-white text-white hover:bg-white hover:text-museum-dark">
                  История музея
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Направления -> Персоналии */}
      <section className="py-20 px-4 bg-museum-navy/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif">
              Категории
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              ------------
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Персоналии', desc: 'От первых передатчиков до современных систем связи и радиолокации', slug: 'personalii'},
              { title: 'Космос', desc: 'От первых передатчиков до современных систем связи и радиолокации', slug: 'kosmos'},
              { title: 'Авиация', desc: 'Летательные аппараты, двигатели и космические технологии', slug: 'aviacziya'},
              { title: 'Радиоприборы', desc: 'Эволюция устройств: от вакуумных ламп до микропроцессоров', slug: 'radiopribory'},
              { title: 'Вычислительные приборы и техника', desc: 'Системы управления, робототехника и кибернетика', slug: 'vychislitelnye-pribory-i-tehnika'},
              { title: 'Фотоаппаратура', desc: 'Диагностическое и лечебное оборудование нового поколения', slug: 'fotoapparatura'},
              { title: 'Кино и видео аппаратура', desc: 'Вклад университета в отечественную науку и образование', slug: 'kino-i-video-apparatura'},
              { title: 'Свидетельства истории', desc: 'Вклад университета в отечественную науку и образование', slug: 'svidetelstva-istorii'},
              { title: 'Разное', desc: 'Вклад университета в отечественную науку и образование', slug: 'raznoe'},
            ].map((dir, i) => (
              <Card
                key={i}
                className="bg-museum-dark border border-gray-800 p-6 hover:border-museum-blue/40 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* <div className="w-14 h-14 rounded-xl bg-museum-blue/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {dir.icon}
                  </div> */}
                  <Link href="/ekspoziciya">
                    <h3 className="text-xl font-bold group-hover:text-museum-blue transition-colors">
                      {dir.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {dir.desc}
                  </p>
                  <Link href={`/exhibition?category=${dir.slug}`} className="inline-flex items-center gap-2 text-museum-blue hover:text-blue-400 text-sm font-medium transition-colors">
                    Подробнее
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-4 bg-gradient-to-br from-museum-blue/15 via-museum-navy/30 to-museum-blue/10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold font-serif">
            ПРИГЛАШАЕМ <br/>В ГОСТИ
          </h2>
          <p className="text-lg text-gray-300">
            Погрузитесь в мир инженерной мысли, узнайте историю развития технологий
            и найдите вдохновение для будущих открытий //ДЛЯ РЕД
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/booking">
              <Button variant="primary" size="lg" className="px-10 font-bold">
                Посетить музей
              </Button>
            </Link>
            <Link href="/news">
              <Button variant="outline" size="lg" className="px-10 font-bold border-white text-white hover:bg-white hover:text-museum-dark">
                Новости и события
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
