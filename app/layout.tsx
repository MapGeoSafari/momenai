import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "momen.ai",
  description: "もめごとを解決するためのアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja-jp">
      <body>{children}</body>
    </html>
  );
}
