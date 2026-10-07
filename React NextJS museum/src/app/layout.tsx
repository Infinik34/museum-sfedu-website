import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { HeroUIProvider } from "@heroui/system";
import "./globals.css";
import Header from "./components/UI/header";
import Footer from "./components/UI/footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Политехнический музей",
  description: "музей",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HeroUIProvider>
          <Header/>
          <main className="grow">
            {children}
          </main>
          <Footer/>
        </HeroUIProvider>
      </body>
    </html>
  );
}
