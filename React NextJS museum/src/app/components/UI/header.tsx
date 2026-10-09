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
          <svg className="w-20 h-auto" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" aria-hidden="true">
            <path d="M100 10 C 140 10 175 60 180 130 C 182 175 155 205 100 210 C 45 205 18 175 20 130 C 25 60 60 10 100 10 Z"
              fill="none" stroke="currentColor" strokeWidth="4" />
            <path d="M 60 160 C 55 140 65 120 85 115 C 95 112 105 115 115 110 C 125 105 130 95 128 85 C 126 78 120 75 122 70 C 125 65 132 68 135 72 C 138 68 142 65 146 68 C 148 72 145 78 142 82 C 148 85 152 92 150 100 C 148 110 140 118 130 122 C 125 124 120 130 118 138 C 130 140 140 145 145 155 C 148 162 145 168 138 168 L 120 168 C 115 155 105 148 95 148 C 85 148 75 155 70 168 L 55 168 C 50 168 48 165 50 160 Z" />
          </svg>
          <p className="font-bold text-inherit text-sm sm:text-base whitespace-nowrap hidden min-[1320px]:block text-museum-text">
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