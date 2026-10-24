`use client`
import { Button, Card } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { ExhibitCategoryItem, getExhibitCategories, getLatestNews, getMainPageSettings, getPersonalityCategories } from "@/lib/strapiApi";
import HeroImageSlider from "./components/imageSlider";
import NewsCardHome from "./components/NewsCardHome";

type StrapiSettingsMain = {
  titleWhite?: string;
  titleBlue?: string;
  excerpt?: string;
  description?: string;
  backgroundMain?: string;
  photos: { url: string }[];
}



export default async function Home() {
  const { data: exhibitCategories } = await getExhibitCategories({
    forMainPage: true,
    limit: 3
  });
  const { data: personalityCategories } = await getPersonalityCategories({ forMainPage: true, limit: 3 });
  const settings: StrapiSettingsMain = await getMainPageSettings()
  const imageUrls = settings?.photos?.map(
    (img: any) => `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`)
  const news = await getLatestNews(3);

  return (
    <main className="min-h-screen bg-museum-dark text-white selection:bg-museum-blue/30">
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Пятна */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <HeroImageSlider images={imageUrls} />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                {settings?.titleWhite ?? "ПОЛИТЕХНИЧЕСКИЙ МУЗЕЙ"}
                <span className="text-museum-blue block mt-2">
                  {settings?.titleBlue ?? "ЮЖНОГО ФЕДЕРАЛЬНОГО УНИВЕРСИТЕТА"}
                </span>
              </h1>

              <blockquote className="text-lg md:text-xl text-gray-300 border-l-4 border-museum-blue pl-6 py-2 bg-museum-navy/20 rounded-r-lg">
                {settings?.excerpt ?? "ЕДИНСТВЕННЫЙ В СВОЕМ РОДЕ МУЗЕЙ НА ЮГЕ РОССИИ В ОБЛАСТИ НАУКИ И ТЕХНИКИ"}
              </blockquote>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
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
                {settings?.description ?? "В экспозиции нашли отражение также история вуза и его роль в развитии науки и техники в нашей стране и за рубежом."}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
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
      {/* Секция с новостями */}
      <section className="py-20 px-4 bg-museum-navy/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-3">
                Новости и события
              </h2>
              <p className="text-gray-400 max-w-xl">
                Узнайте о последних выставках, лекциях и мероприятиях музея.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {news.data.map((item) => (
              <NewsCardHome key={item.documentId} item={item} />
            ))}
          </div>
        </div>
      </section>
      {/* Категории экспонатов //bg-museum-navy/20*/}
      <section className="py-20 px-4 bg-museum-navy/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl">
              Экспонаты
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Разделы экспозиции, посвящённые разным направлениям науки и техники.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exhibitCategories.map((cat) => (
              <Card
                key={cat.slug}
                className="bg-museum-dark border border-gray-800 p-6 hover:border-museum-blue/40 transition-all duration-300 group"
              >
                <div className="space-y-4 flex flex-col h-full">
                  <Link href={`/exhibition/exhibits?category=${cat.slug}`}>
                    <h3 className="text-xl font-bold group-hover:text-museum-blue transition-colors">
                      {cat.name}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    Раздел экспозиции музея.
                  </p>
                  <Link
                    href={`/exhibition/exhibits?category=${cat.slug}`}
                    className="inline-flex items-center gap-2 text-museum-blue hover:text-blue-400 text-sm font-medium transition-colors mt-auto"
                  >
                    Подробнее
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="pt-10 flex justify-center">
          <Link
            href="/exhibition/exhibits"
            className="px-4 w-25 h-13 flex items-center justify-center py-2 rounded-sm transition-all bg-[#0d183b] text-lg text-gray-100 border border-blue-800 hover:bg-museum-navy"
          >
            Все
          </Link>
        </div>
      </section>
      {/* Персоналии */}
      <section className="py-15 px-4 bg-museum-navy/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl">
              Персоналии
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Люди, чьи идеи и труд определили развитие науки и техники.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalityCategories.map((cat) => (
              <Card
                key={cat.slug}
                className="bg-museum-dark border border-gray-800 p-6 hover:border-museum-blue/40 transition-all duration-300 group"
              >
                <div className="space-y-4 flex flex-col h-full">
                  <Link href={`/exhibition/personalities?category=${cat.slug}`}>
                    <h3 className="text-xl font-bold group-hover:text-museum-blue transition-colors">
                      {cat.name}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    Раздел экспозиции музея.
                  </p>
                  <Link
                    href={`/exhibition/personalities?category=${cat.slug}`}
                    className="inline-flex items-center gap-2 text-museum-blue hover:text-blue-400 text-sm font-medium transition-colors mt-auto"
                  >
                    Подробнее
                  </Link>
                </div>
              </Card>
            ))}
          </div>

        </div>
        <div className="pt-10 flex justify-center">
          <Link
            href="/exhibition/personalities"
            className="px-4 w-25 h-13 flex items-center justify-center py-2 rounded-sm transition-all bg-[#0d183b] text-lg text-gray-100 border border-blue-800 hover:bg-museum-navy"
          >
            Все
          </Link>
        </div>
      </section>

      <section className="py-15 px-4 bg-gradient-to-br from-museum-blue/15 via-museum-navy/30 to-museum-blue/10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl">
            ПРИГЛАШАЕМ В ГОСТИ
          </h2>
          <p className="text-lg text-gray-300">
            Погрузитесь в мир инженерной мысли, узнайте историю развития технологий
            и найдите вдохновение для будущих открытий
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/booking"
              className="inline-block bg-blue-950 hover:bg-museum-navy text-white px-10 py-3 rounded-4xl font-bold transition-colors duration-300"
            >
              Посетить музей
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
