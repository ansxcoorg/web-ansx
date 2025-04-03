"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PhoneCall,
  Navigation,
  Package,
  Truck,
  Clock,
  MapPin,
} from "lucide-react";
import SlideImages from "./home/slideImages";
import PapersNews from "./home/PapersNews";
import PackagePrice from "./home/packageprice";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
const NotificationPopup = dynamic(
  () => import("@/components/ui/NotificationPopup"),
  {
    ssr: false,
  }
);

export default function Home() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    setIsContentLoaded(true);
  }, []);
  return (
    <>
      {isContentLoaded && <NotificationPopup />}
      <div>
        <section className="mb-12">
          <SlideImages />
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {t("feature_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-red-100 p-4 mb-4">
                  <Truck className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("feature_shipping")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("shipping_description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-red-100 p-4 mb-4">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("feature_express")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("express_description")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-red-100 p-4 mb-4">
                  <Package className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("feature_cod")}
                </h3>
                <p className="text-gray-600 text-sm">{t("cod_description")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-red-100 p-4 mb-4">
                  <Navigation className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("feature_tracking")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("tracking_description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-red-600 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl text-white font-bold mb-8">
              {t("news_activities")}
            </h2>
            <PapersNews />
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">{t("main_pricing")}</h2>
          <PackagePrice />
        </section>

        <section className="bg-red-600 text-white py-12 hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t("hero_title")}</h2>
            <p className="mb-8 max-w-2xl mx-auto">{t("hero_description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-red-600 hover:bg-gray-100">
                <PhoneCall className="mr-2 h-4 w-4" />
                {t("contact_us")}
              </Button>
              <Link href={`/${locale}/branches`}>
                <Button className="bg-white text-red-600 hover:bg-gray-100">
                  <MapPin className="mr-2 h-4 w-4" />
                  {t("find_branch")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
