import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import {
  Be_Vietnam_Pro,
  Inter,
  Noto_Sans_Lao,
  Noto_Sans_SC,
  Sarabun,
} from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Locale, routing } from "@/i18n/routing";
import { ToastContainer } from "react-toastify";
import ClientBody from "./ClientBody";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import FloatingContactButton from "@/components/layout/FloatingContactButton";
import AOSInit from "@/components/layout/AOSInit";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansLao = Noto_Sans_Lao({
  weight: ["400", "700"],
  subsets: ["lao"],
  variable: "--font-noto-sans-lao",
});
const notoSansSC = Noto_Sans_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
});
const sarabun = Sarabun({
  weight: ["400", "700"],
  subsets: ["thai"],
  variable: "--font-sarabun",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "700"],
  subsets: ["vietnamese"],
  variable: "--font-be-vietnam-pro",
});
export const metadata: Metadata = {
  title: "Anousith Logistics",
  description: "Logistics and shipping",
  icons: {
    icon: "/ans-logo.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // LA|US|TH|CH|VN|KR
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}>
      
      <body
        className={`antialiased ${
          locale === "LA"
            ? "font-lao"
            : locale === "TH"
            ? "font-thai"
            : locale === "CN"
            ? "font-chinese"
            : locale === "VN"
            ? "font-vietnamese"
            : locale === "KR"
            ? "Noto Sans KR"
            : "font-inter"
            
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <AOSInit />
          <ClientBody>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 font-lao">{children}</main>

              <Footer />
              <FloatingContactButton />
            </div>
          </ClientBody>
        </NextIntlClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}