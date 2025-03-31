import type { Metadata } from "next";
import { Inter, Noto_Sans_Lao } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import logo from "@/assets/img/ans-logo.png";
import { ToastContainer } from "react-toastify";
import './globals.css';
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansLao = Noto_Sans_Lao({
  weight: ["400", "700"],
  subsets: ["lao"],
  variable: "--font-noto-sans-lao",
});

export const metadata: Metadata = {
  title: "Anousith Logistics",
  description: "Logistics and shipping",
  icons: {
    icon: "/ans-logo.png", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoSansLao.variable} font-sans`}>
        <ClientBody>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ClientBody>
        <ToastContainer />
      </body>
    </html>
  );
}
