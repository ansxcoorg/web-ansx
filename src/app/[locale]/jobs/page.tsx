"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useLazyQuery } from "@apollo/client";
import { FaFacebook } from "react-icons/fa6";
import {
  Calendar,
  User,
  UserPlus,
  CheckCircle,
  Clock,
  Shield,
  X,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import Schema from "../../../apollo/index";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Catalog {
  title: string;
}
interface JobItem {
  image?: string;
  createdAt: string | Date;
  catalog: Catalog;
  title: string;
}

export default function Jobs() {
  const t = useTranslations("jops");
  const [itemsJobs, setItemsJobs] = useState<JobItem[]>([]);
  const [fetchData, { data, loading }] = useLazyQuery(Schema.communities, {
    fetchPolicy: "cache-and-network",
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<JobItem | null>(null);

  const getImgSrc = (item?: JobItem) =>
    item?.image
      ? `https://storage.googleapis.com/ansx/website/images/${item.image}`
      : "/placeholders/job-card.jpg";

  const openLightbox = (item: JobItem) => {
    setActiveItem(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveItem(null);
  };

  useEffect(() => {
    fetchData({
      variables: {
        where: {
          isPublic: 1,
          isVideo: 0,
          catalog: 16,
        },
      },
    });
  }, [fetchData]);

  useEffect(() => {
    if (data?.communities?.data) {
      setItemsJobs(data.communities.data || []);
    }
  }, [data]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const hasJobs = useMemo(() => (itemsJobs?.length || 0) > 0, [itemsJobs]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-500 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/introl2.911109cb.png"
            alt={t("ansx_careers_alt")}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 px-6 py-14 md:px-12 md:py-20 bg-black/50">
          <div className="max-w-2xl">
            <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs tracking-wide backdrop-blur">
              {t("announcement_badge")}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
              {t("announcement_signup_title")}
            </h1>
            <p className="mt-3 text-white/90 md:text-lg">{t("hero_desc")}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/AnousithExpress"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600/80 px-4 py-2 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
              >
                <FaFacebook className="h-5 w-5" />
                Facebook Page
              </a>
              <button
                onClick={() => {
                  document.getElementById("open-roles")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="inline-flex items-center rounded-xl bg-white/10 px-4 py-2.5 font-medium text-white backdrop-blur transition hover:bg-white/15"
              >
                {t("btn_view_open_roles")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl border border-neutral-200 shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105">
          <CardContent className="p-6">
            <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden mb-3 group">
              <span className="absolute inset-0 bg-red-600 top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0 rounded-full" />
              <CheckCircle className="relative z-10 h-6 w-6 text-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]" />
            </div>
            <h3 className="text-lg font-semibold">{t("feature_env_title")}</h3>
            <p className="mt-1.5 text-sm text-neutral-600">
              {t("feature_env_desc")}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-neutral-200 shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105">
          <CardContent className="p-6">
            <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden mb-3 group">
              <span className="absolute inset-0 bg-red-600 top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0 rounded-full" />
              <Clock className="relative z-10 h-6 w-6 text-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]" />
            </div>
            <h3 className="text-lg font-semibold">
              {t("feature_growth_title")}
            </h3>
            <p className="mt-1.5 text-sm text-neutral-600">
              {t("feature_growth_desc")}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-neutral-200 shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105">
          <CardContent className="p-6">
            <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden mb-3 group">
              <span className="absolute inset-0 bg-red-600 top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0 rounded-full" />
              <Shield className="relative z-10 h-6 w-6 text-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]" />
            </div>
            <h3 className="text-lg font-semibold">
              {t("feature_benefits_title")}
            </h3>
            <p className="mt-1.5 text-sm text-neutral-600">
              {t("feature_benefits_desc")}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <h2 className="text-2xl font-bold md:text-3xl">{t("intro_title")}</h2>
        <p className="mt-3 max-w-3xl text-neutral-700">{t("intro_desc")}</p>
        <ul className="mt-4 grid list-disc gap-2 pl-6 text-neutral-700 md:grid-cols-2">
          <li>{t("intro_li_1")}</li>
          <li>{t("intro_li_2")}</li>
          <li>{t("intro_li_3")}</li>
          <li>{t("intro_li_4")}</li>
        </ul>
      </section>

      <section id="open-roles" className="mt-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-bold">{t("open_roles_title")}</h3>
            <p className="text-sm text-neutral-600">
              {t("open_roles_subtitle")}
            </p>
          </div>
          <Link
            href="https://job.anousith.express/index"
            className="hidden rounded-xl border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 md:inline-block"
          >
            {t("apply_now_button")}
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-neutral-200"
              >
                <div className="h-48 w-full bg-neutral-200" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-1/3 bg-neutral-200" />
                  <div className="h-4 w-2/3 bg-neutral-200" />
                  <div className="h-9 w-28 rounded-lg bg-neutral-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !hasJobs && (
          <Card className="rounded-2xl border border-neutral-200 bg-white text-center shadow-sm">
            <CardContent className="p-10">
              <h4 className="text-lg font-semibold">{t("empty_title")}</h4>
              <p className="mt-2 text-neutral-600">{t("empty_desc")}</p>
              <div className="mt-5">
                <Link
                  href="https://job.anousith.express/index"
                  className="inline-flex items-center rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-red-700"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  {t("signup_now")}
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && hasJobs && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {itemsJobs.map((value, index) => {
              const imgSrc = getImgSrc(value);
              return (
                <Card
                  key={index}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div
                    className="overflow-hidden rounded-t-2xl flex justify-center cursor-zoom-in"
                    onClick={() => openLightbox(value)}
                  >
                    <Image
                      src={imgSrc}
                      alt={value.title || t("job_image_alt")}
                      width={1200}
                      height={800}
                      className="w-full h-auto max-h-96 object-contain"
                      sizes="(min-width:1024px) 50vw, (min-width:768px) 50vw, 100vw"
                      priority={index < 2}
                    />
                  </div>

                  <CardContent className="flex flex-grow flex-col p-4">
                    <div className="mb-2 flex items-center text-sm text-neutral-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{formatDate(value?.createdAt as any)}</span>
                      <span className="mx-2">•</span>
                      <User className="mr-1 h-4 w-4" />
                      <span>
                        {value?.catalog?.title || t("catalog_fallback")}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold leading-snug">
                      {value?.title}
                    </h4>

                    <div className="mt-auto pt-4">
                      <Link
                        href="https://job.anousith.express/index"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                      >
                        <UserPlus className="h-5 w-5" />
                        {t("signup_now")}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {lightboxOpen && activeItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/75 flex items-center justify-center p-2 md:p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[80vw] max-h-[80vh] rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src={getImgSrc(activeItem)}
              alt={activeItem?.title || t("job_image_alt")}
              className="max-w-full max-h-[80vh] object-contain rounded-xl select-none"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 z-20 rounded-full backdrop-blur-sm bg-white/70 hover:bg-white/90 transition p-2 shadow-lg"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-neutral-800" />
            </button>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pt-10 pb-3 text-center">
              <p className="text-white text-sm md:text-base">
                {activeItem?.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
