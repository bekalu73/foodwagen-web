import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { metaObject } from "@/config/site-config";

const sourceSansPro = Source_Sans_3({
  variable: "--font-Source_Sans_3",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = metaObject();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSansPro.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
