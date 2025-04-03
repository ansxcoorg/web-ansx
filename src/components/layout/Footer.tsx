"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import DownloadAPP from "../../img/IOS_ANDROID_DOWNLOAD.png";
import Logo from "../../img/logo_next_day.png";
import { useLocale, useTranslations } from "next-intl";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  return (
    <footer className="bg-[#f6f7f7] border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 relative h-12 w-40">
              <Image
                src={Logo}
                alt="Anousith Express Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t("company_name")} {t("description")} 
            </p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{t("address")}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Phone className="mr-2 h-4 w-4" />
              <span>{t("phone")}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Phone className="mr-2 h-4 w-4" />
              <span>{t("hotline")}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="mr-2 h-4 w-4" />
              <span>{t("email")}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">{t("link")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/news`}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link
             
                  href={`/${locale}/branches`}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  {t("branches")}
                </Link>
              </li>
              <li>
                <Link
         
                  href={`/${locale}/pricing`}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                    {t("pricing")}
                </Link>
              </li>
              <li>
                <Link
            
                  href={`/${locale}/about`}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
            
                  href={`/${locale}/jobs`}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  {t("jobs")}
                </Link>
              </li>
              <li>
                <Link
          
                  href={`/${locale}/contact`}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                   {t("contact")}
                </Link>
              </li>
              <li>
                <Link
  
                  href={`/${locale}/policy`}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                   {t("policy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">{t("Mobile App")}</h3>
            <p className="text-sm text-gray-600 mb-4">
            {t("mobile_app")}
            </p>
            <div className="relative h-56 w-full">
              <Image
                src={DownloadAPP}
                alt="Download mobile app"
                layout="fill"
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">{t("More Information")}</h3>
            <div className="flex space-x-4">
              <a
              
                href="https://www.facebook.com/AnousithExpress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@ans_express"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <SiTiktok className="h-6 w-6" />
              </a>
            </div>
            <p className="text-sm text-gray-600">
            {t("follow_us")}
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {currentYear} {t("more")}
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              {t("terms")}
            </Link>
            <Link
              href={`/${locale}/policy`}
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
