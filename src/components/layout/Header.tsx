"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import LogoAns from "../../img/logo_next_day.png";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import LocalSelect from "./LocalSelect";
import DarkModeToggle from "../ui/DarkModeToggle";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");
  const locale = useLocale();
  const [trackingNumber, setTrackingNumber] = useState("");

  console.log("locale", locale);

  const navItems = [
    { name: t("news"), href: "/news" },
    { name: t("branches"), href: "/branches" },
    { name: t("pricing"), href: "/pricing" },
    { name: t("about"), href: "/about" },
    { name: t("jobs"), href: "/jobs" },
    { name: t("contact"), href: "/contact" },
    { name: t("policy"), href: "/policy" },
  ];

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <header className="bg-white/80 sticky top-0 z-40 w-full border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
              <div className="text-center">
                <Image
                  src={LogoAns}
                  alt="Anousith Express Logo"
                  className="animate-bounce mb-6 mx-auto"
                  width={120}
                  height={120}
                />
                <div className="flex space-x-2 justify-center">
                  <div className="w-3 h-12 bg-red-500 animate-pulse rounded-lg"></div>
                  <div className="w-3 h-16 bg-red-500 animate-pulse delay-100 rounded-lg"></div>
                  <div className="w-3 h-10 bg-red-500 animate-pulse delay-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          )}

          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-36">
              <Image
                src={LogoAns}
                alt="Anousith Express Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === `/${locale}${item.href}`;
              return (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href}`}
                  className={`text-sm font-bold px-3 py-2 transition-colors
          ${
            isActive
              ? "text-red-600 border-b-2 border-red-600"
              : "text-gray-700 hover:text-red-600"
          }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <LocalSelect defaultValue={locale} label="Language" />
          </nav>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-white shadow-xl rounded-l-2xl p-4"
            >
              <div className="flex flex-col space-y-6">
                {/* Language Selector */}
                <LocalSelect defaultValue={locale} label="Language" />

                {/* Search Form */}
                <form
                  action={`https://app.anousith.express/landing/search_tracking/search_item?_bill_detail=${trackingNumber}&n_home=2`}
                  method="get"
                  className="flex flex-col space-y-4"
                >
                  <div className="relative">
                    <Input
                      type="text"
                      name="_bill_detail"
                      placeholder={t("tracking_placeholder")}
                      className="w-full bg-gray-100 rounded-lg p-3 pr-10 border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={`/${locale}${item.href}`}
                      className="text-lg font-semibold text-gray-700 hover:text-red-600 px-3 py-2 transition-all rounded-lg hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
