'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Кнопка-бургер */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-museum-text hover:text-white transition-colors"
        aria-label="Меню"
      >
        {/* Иконка: три полоски или крестик */}
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-museum-navy border-b border-gray-800 z-50">
          <nav className="flex flex-col p-4 space-y-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-museum-text hover:text-white py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}