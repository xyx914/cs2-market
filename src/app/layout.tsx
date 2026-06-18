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
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa', color: '#111827', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif' }}>
        {/* Header */}
        <header style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
          <nav style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="/" style={{ fontWeight: 700, fontSize: 17, textDecoration: 'none', color: '#111827', letterSpacing: '-0.02em' }}>aasdso.top</a>
            <a href="#docs" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', transition: 'color 0.15s' }}>文档</a>
            <a href="#tools" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', transition: 'color 0.15s' }}>工具</a>
          </nav>
        </header>
        <main style={{ flex: 1, width: '100%' }}>{children}</main>
        {/* Footer */}
        <footer style={{ borderTop: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px', textAlign: 'center', fontSize: 14, color: '#9ca3af' }}>
            © {new Date().getFullYear()} aasdso.top
          </div>
        </footer>
      </body>
    </html>
  );
}
