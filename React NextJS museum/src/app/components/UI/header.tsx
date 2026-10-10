'use client'

import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/config";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false);

  const getNavItems = () => {
    return (
      siteConfig.navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <li key={item.href}>
            <Link className={`
                  relative px-3 py-3 tracking-wide text-lg font-medium transition-all duration-300
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-500
                  after:transition-all after:duration-300 after:rounded-full hidden min-[960px]:block
                  ${isActive
                ? "text-blue-600 after:w-full"
                : "text-gray-600 hover:text-blue-500 after:w-0 hover:after:w-full"
              }
                `} href={item.href}>{item.label}</Link>
          </li>
        )
      })
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full left-0 right-0 max-w-screen min-h-16 h-24 bg-museum-dark/95 border-b border-gray-800/50 backdrop-blur-lg">
      <div className="flex items-center justify-between py-4 px-5 mx-auto h-full">
        {/* Логотип и название */}
        <Link href='/' className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 1281 1228"><g fill="#fff"><path d="M767 9c-72 8-147 52-238 136a2161 2161 0 0 0-161 169A2010 2010 0 0 0 99 694C51 788 14 892 9 954c-1 20 4 45 14 66 9 17 18 29 34 46q69 68 226 108a1610 1610 0 0 0 656 14c140-30 238-82 286-154 23-34 39-83 44-137a614 614 0 0 0-9-154c-26-147-77-303-141-432A751 751 0 0 0 937 59c-28-22-65-39-97-46-22-5-53-6-73-4m44 36c50 6 91 28 135 71 24 25 44 51 71 91a1423 1423 0 0 1 214 585q12 114-33 196c-29 53-94 104-172 138-76 33-162 50-288 59a1531 1531 0 0 1-372-22 663 663 0 0 1-246-88q-62-44-72-98c-5-23-1-52 14-101q39-138 142-298c77-119 198-268 302-370 56-56 92-87 133-114 46-30 81-44 125-49z" /><path d="M810 363q-7 4-7 11 0 6 9 16 11 11 6 15c-4 4-6 4-16 0l-9-3c-3 1-22 22-26 29-6 9-5 20 2 25q6 6 20 5 15-1 27-11c10-10 14-9 28 4 12 11 19 15 29 19q13 6 13 13 0 17-34 5-48-19-95-10-29 5-43 0l-33-15c-26-12-34-15-44-15q-10 0-26 9c-16 9-22 10-28 3-3-3-3-4-3-11q1-13 10-24l4-6 1-1 7-3q10-7 24-9c12-2 22 0 42 10 22 10 29 12 45 12 10 0 13 0 19-2q15-5 16-12 0-9-20-5c-19 4-28 2-55-12-29-14-35-15-60-15-21-1-32 1-48 7a66 66 0 0 0-47 54c-4 23 4 48 20 64 7 7 10 8 17 12 14 7 29 9 57 7l64-4q5-3-6-15-10-10-3-13l10-1c7 1 9 1 15 4q19 9 14 25-3 11-1 16l7 6v1c0 2 9 8 19 13q15 8 43 16c27 8 42 16 53 26 11 11 15 20 19 37l4 12q3 5 8 3c3-1 13-11 21-20q7-7 12-6l4 2c1 0 0 11-2 20q-5 20-26 47-15 19-22 37-9 19-15 19c-7 0-12-6-25-30-11-21-15-28-21-35a80 80 0 0 0-55-29c-11-1-15-1-44 2q-38 5-83-9c-7-1-30-9-51-16-55-18-81-24-110-28-16-2-37-2-45 0q-21 7-29 22-6 11-3 20a1634 1634 0 0 1 112 216c12 26 18 34 39 53 14 12 16 15 13 18-4 4-15 4-50 0q-46-6-52-12-3-3-1-7l5-12q23-44 6-79-3-5-4-5v-1c0-2-9-12-16-17-13-9-28-15-53-19a135 135 0 0 1-43-13l-4-5q-10-11-7-30c3-12 8-27 22-56 15-33 15-38 2-39q-6 0-10 2c-23 10-61 51-77 84q-32 62 16 120l13 16c23 29 32 50 35 83 2 21 5 32 14 42 5 6 16 13 24 17 15 6 30 8 78 13 51 5 75 8 117 14 90 12 151 19 215 21q56 3 82-4c24-6 33-17 40-49q8-38 21-58 7-12 26-34a307 307 0 0 0 55-328c-9-24-11-34-11-48 1-24 12-41 41-62q21-15 30-30c20-30 16-63-9-74-20-10-45-9-66 4-7 4-16 12-15 13l-1 2h-2l-9 9-3 6-1 1-4 4q-9 12-17 17-10 5-21 2c-11-4-16-10-22-28-8-18-15-26-32-33-6-3-9-3-17-4q-9-1-13 2M503 651q20 3 69 17l74 19c14 3 13 3 11 10q-4 9-4 29c-2 21-6 26-23 22-16-2-93-22-104-26-33-11-66-33-81-52q-6-10-2-15 4-4 16-6c8-1 31 0 44 2m163 195q35 3 57 26c8 9 12 15 18 26q12 27 0 36l-4 4h-13c-11-1-14-1-25-4-34-8-75-26-104-45q-43-28-20-37c13-7 55-9 91-6" /></g></svg>
          <p className="font-bold text-inherit text-sm sm:text-base whitespace-nowrap ml-2 hidden min-[1320px]:block text-museum-text">
            Политехнический музей ЮФУ
          </p>
        </Link>

        {/* Десктопная навигация */}
        <nav className="hidden min-[960px]:flex gap-4 px-2">
          <ul className="flex gap-4">
            {getNavItems()}
          </ul>
        </nav>

        {/* Кнопка "Посетить" для десктопа */}
        <div className="hidden sm:flex">
          <Link href='/booking'>
            <Button
              variant="primary"
              size="sm"
              className="font-medium text-sm px-4 bg-blue-700 hover:opacity-90 hidden min-[1080px]:block"
            >
              Посетить
            </Button>
          </Link>
        </div>

        {/* Кнопка бургер-меню */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 text-white min-[960px]:hidden"
          aria-label="Меню"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="min-[960px]:hidden bg-museum-dark border-t border-gray-800 absolute top-24 left-0 right-0">
          <ul className="px-4 py-2">
            {siteConfig.navItems.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <Link
                  href={item.href}
                  className={`block py-3 text-museum-text hover:text-white transition-colors ${pathname === item.href ? 'text-blue-400 font-medium' : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-gray-800 mt-2">
              <Link href='/booking' onClick={closeMenu}>
                <Button variant="primary" size="sm" className="w-full bg-blue-700">
                  Посетить
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}