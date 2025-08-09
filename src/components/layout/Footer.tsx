"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import APPLICATION_DOWNLOAD from "../../img/APLICATION_DOWNLOAD.png";
import Logo from "../../img/logo_next_day.png";
import { useLocale, useTranslations } from "next-intl";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t bg-gradient-to-b from-gray-50 to-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Contact */}
          <div>
            <div className="relative mb-4 h-12 w-44">
              <Image
                src={Logo}
                alt="Anousith Express Logo"
                fill
                sizes="(max-width: 640px) 176px, 176px"
                className="object-contain"
                priority
              />
            </div>
            <p className="mb-4 text-sm text-gray-600">
              {t("company_name")} {t("description")}
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>{t("phone")}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>{t("hotline")}</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>{t("email")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold tracking-tight">
              {t("link")}
              <span className="ml-2 inline-block h-1 w-10 rounded bg-red-500 align-middle" />
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/news`}
                  className="text-sm text-gray-700 transition-colors hover:text-red-600"
                >
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/branches`}
                  className="text-sm text-gray-700 transition-colors hover:text-red-600"
                >
                  {t("branches")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/pricing`}
                  className="text-sm text-gray-700 transition-colors hover:text-red-600"
                >
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-gray-700 transition-colors hover:text-red-600"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/jobs`}
                  className="text-sm text-gray-700 transition-colors hover:text-red-600"
                >
                  {t("jobs")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-gray-700 transition-colors hover:text-red-600"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/policy`}
                  className="text-sm text-gray-700 transition-colors hover:text-red-600"
                >
                  {t("policy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile App */}
          <div>
            <h3 className="mb-4 text-lg font-semibold tracking-tight">
              {t("Mobile App")}
              <span className="ml-2 inline-block h-1 w-10 rounded bg-red-500 align-middle" />
            </h3>
            <p className="mb-4 text-sm text-gray-600">{t("mobile_app")}</p>

            <div className="relative mb-2 h-64 w-full hover:scale-[1.1] transition-transform duration-300 ease-in-out hover:drop-shadow-lg">
              <Image
                src={APPLICATION_DOWNLOAD}
                alt="Download mobile app"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold tracking-tight">
              {t("More Information")}
              <span className="ml-2 inline-block h-1 w-10 rounded bg-red-500 align-middle" />
            </h3>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/AnousithExpress"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:text-blue-600 hover:shadow-md"
                title="Facebook"
              >
                <FaFacebookF className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>

              <a
                href="https://www.tiktok.com/@ans_express"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:text-black hover:shadow-md"
                title="TikTok"
              >
                <SiTiktok className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>

            <p className="mt-4 text-sm text-gray-600">{t("follow_us")}</p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-600 md:text-left">
            © {currentYear} {t("more")}
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-gray-700 transition-colors hover:text-red-600"
            >
              {t("terms")}
            </Link>
            <Link
              href={`/${locale}/policy`}
              className="text-sm text-gray-700 transition-colors hover:text-red-600"
            >
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}