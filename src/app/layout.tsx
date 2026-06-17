import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aasdso.top - 文档与工具",
  description: "aasdso.top 提供实用文档和在线工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-6">
            <a href="/" className="font-bold text-lg tracking-tight">aasdso.top</a>
            <a href="#docs" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">文档</a>
            <a href="#tools" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">工具</a>
          </nav>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-zinc-400">
            © {new Date().getFullYear()} aasdso.top
          </div>
        </footer>
      </body>
    </html>
  );
}
