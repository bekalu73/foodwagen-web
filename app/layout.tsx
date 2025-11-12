import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { metaObject } from "@/config/site-config";
import Header from "@/features/shared/Header";
import Footer from "@/features/shared/Footer";
import AuthProvider from "@/provider/session-provider";
import QueryProvider from "@/provider/query-provider";

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
        <AuthProvider>
          <QueryProvider>
            <Header />
            {children}
            <Footer />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
