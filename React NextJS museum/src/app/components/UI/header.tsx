'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { Button } from "@heroui/react";
import Image from "next/image";
import img from './../../../../public/musIcon.png'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/config";
import { useState } from "react";

export default function Header() {

  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavItems = () => {
    return (
      siteConfig.navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <NavbarItem isActive={isActive} key={item.href}>
            <Link className={`
                  relative px-3 py-3 tracking-wide text-lg font-medium transition-all duration-300
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-500
                  after:transition-all after:duration-300 after:rounded-full hidden min-[960px]:block
                  ${isActive
                ? "text-blue-600 after:w-full"
                : "text-gray-600 hover:text-blue-500 after:w-0 hover:after:w-full"
              }
                `} href={item.href}>{item.label}</Link>
          </NavbarItem>
        )
      })
    )
  }

  return (
    <Navbar position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="w-full top-0 z-50 left-0 right-0 max-w-screen min-h-16 h-24"
      classNames={{
        wrapper: "px-4 py-4",
        base: "bg-museum-dark/95 border-b border-gray-800/50 items-center",
        item: "text-museum-text"
      }}>

      <NavbarBrand>
        <Link href='/' className="flex items-center gap-1">
          {/* <Image alt='logo' src={img} width={50} height={50} priority /> */}
          <svg
            viewBox="0 0 300 320"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-20 h-auto sm:w-20 flex-shrink-0"
            aria-label="Логотип Политехнического музея"
          >
            <path
              d="M 150 50 L 240 120 L 60 120 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M 150 56 L 235 120 L 65 120 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              x="150"
              y="110"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="30"
              fontWeight="bold"
            >
              M
            </text>
            <rect x="50" y="125" width="200" height="4" />
            <rect x="50" y="133" width="200" height="2" />
            <g>
              <text
                x="150"
                y="240"
                textAnchor="middle"
                fontFamily="'Times New Roman', serif"
                fontSize="90"
                fontWeight="bold"
                transform="scale(1, 1.3)"
                style={{ transformOrigin: '150px 180px' }}
              >
                MUSEUM
              </text>
            </g>
            <rect x="50" y="260" width="200" height="4" />
            <rect x="50" y="268" width="200" height="2" />
            <text
              x="150"
              y="300"
              textAnchor="middle"
              fontFamily="'Times New Roman', serif"
              fontSize="14"
              letterSpacing="0.2em"
              fontWeight="bold"
            >
              SOUTH FEDERAL UNIVERSITY
            </text>
          </svg>
          <p className="font-bold text-inherit text-sm sm:text-base whitespace-nowrap hidden min-[1320px]:block">
            Политехнический музей ЮФУ
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="min-[960px]:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          className="text-museum-text relative"
        />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4 px-2" justify="start">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link href='/booking'>
            <Button
              variant="primary"
              size="sm"
              className="font-medium text-sm px-4 bg-blue-700 hover:opacity-90 hidden min-[1080px]:block"
            >
              Посетить{/* Записаться */}
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>


      <NavbarMenu className="bg-museum-dark border-t border-gray-800 top-24"
        motionProps={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.15 }
        }}>
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              href={item.href}
              className={`block py-3 text-museum-text hover:text-white transition-colors ${pathname === item.href ? 'text-blue-400 font-medium' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        {/* Кнопка внутри мобильного меню */}
        <NavbarMenuItem className="pt-4 border-t border-gray-800 mt-2">
          <Link href='/booking' onClick={() => setIsMenuOpen(false)}>
            <Button size="sm" className="w-full bg-blue-700">
              Посетить{/* Записаться */}
            </Button>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>



    </Navbar>
  );
}
