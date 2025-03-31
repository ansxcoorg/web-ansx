"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import LogoAns from "../../img/logo_next_day.png";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "ລາຍງານ ແລະ ຂ່າວສານ", href: "/news" },
  { name: "ສາຂາທັງໝົດ", href: "/branches" },
  { name: "ຄ່າບໍລິການ", href: "/pricing" },
  { name: "ກ່ຽວກັບພວກເຮົາ", href: "/about" },
  { name: "ຮ່ວມງານກັບພວກເຮົາ", href: "/jobs" },
  { name: "ຕິດຕໍ່ພວກເຮົາ", href: "/contact" },
  { name: "ນະໂຍບາຍຕ່າງໆ", href: "/policy" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <header className="bg-gray-200 sticky top-0 z-40 w-full border-b border-gray-200">
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

          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-bold text-gray-700 hover:text-red-600 transition-colors px-3 py-2 "
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          {/* <form
            action="https://app.anousith.express/landing/search_tracking/search_item"
            method="get"
            className="hidden md:flex items-center"
          >
            <div className="relative">
              <Input
                type="search"
                name="trackingID"
                placeholder="ຄົ້ນຫາຂໍ້ມູນທີ່ຕ້ອງການ..."
                className="w-64 rounded-full bg-gray-100 focus:ring-red-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form> */}

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <form
                action="https://app.anousith.express/landing/search_tracking/search_item"
                method="get"
                className="flex items-center"
              >
                <div className="mt-6">
                  <div className="relative">
                    <Input
                      type="search"
                      name="query"
                      placeholder="ຄົ້ນຫາຂໍ້ມູນທີ່ຕ້ອງການ..."
                      className="w-full bg-gray-100"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium px-2 py-2 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
