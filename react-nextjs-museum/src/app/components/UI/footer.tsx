"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white text-2xl font-bold mb-6">Политехнический музей ЮФУ</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Адрес</p>
                  <a href="https://yandex.ru/maps/org/politekhnicheskiy_muzey_yufu/37579314986/?from=mapframe&ll=38.939226%2C47.205865&z=15" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    347900, Россия, Ростовская обл.,<br />
                    г. Таганрог, ул. Чехова, 22, корп. «Б», 2-й подъезд
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Телефон</p>
                  <a href="tel:+78634371461" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    +7 (863) 437-14-61
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Email</p>
                  <a href="mailto:museum.trtu.ita@yandex.ru" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    museum.trtu.ita@yandex.ru
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Режим работы</p>
                  <p className="text-sm text-gray-400">Вторник — Воскресенье: 10:00 – 16:00</p>
                  <p className="text-sm text-gray-500">Понедельник: выходной</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Как нас найти</h3>
            <div className="bg-gray-800 rounded-xl overflow-hidden h-64">
              <div className="relative h-64 w-full overflow-hidden rounded-xl">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=38.939387%2C47.205612&mode=poi&poi%5Bpoint%5D=38.939223%2C47.205867&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D37579314986&z=17"
                  title="Политехнический музей ЮФУ на Яндекс Картах"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="border-0"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              ул. Чехова, 22, корпус «Б», 2-й подъезд
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© {currentYear} Политехнический музей ЮФУ. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}