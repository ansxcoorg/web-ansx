"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Search,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLazyQuery } from "@apollo/client";
import Schema from "../../../apollo/index";
import { formatDate } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import PopupModal from "@/components/ui/PopupModal";
import clsx from "clsx";

interface Catalog {
  title: string;
}
interface newsItem {
  id: string;
  image: string;
  title: string;
  date: Date;
  catalog: Catalog;
  createdAt: Date;
}

export default function NewsPage() {
  const t = useTranslations("news");
  const locale = useLocale();

  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const [rawQuery, setRawQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // debounced value

  const [newsItems, setNewsItems] = useState<newsItem[]>([]);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(7);
  const [totalPages, setTotalPages] = useState(1);

  const [fetchData, { data, loading }] = useLazyQuery(Schema.news, {
    fetchPolicy: "cache-and-network",
  });

  // fetch per page
  useEffect(() => {
    fetchData({
      variables: {
        where: {},
        limit,
        skip: (page - 1) * limit,
      },
    });
  }, [fetchData, page, limit]);

  useEffect(() => {
    if (data) {
      setNewsItems(data?.communities?.data || []);
      const calculatedTotalPages = Math.ceil(
        (data?.communities?.total || 0) / limit
      );
      setTotalPages(calculatedTotalPages);
    }
  }, [data, limit]);

  // sync ?page=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [page]);

  const openModal = (news: any) => {
    setSelectedItem(news);
    setIsOpen(true);
  };
  const closeModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  // ------- Auto Slide + Animation (Featured) -------
  const [activeIndex, setActiveIndex] = useState(0);
  const AUTOPLAY_MS = 2500;

  useEffect(() => {
    setActiveIndex(0);
  }, [newsItems]);

  useEffect(() => {
    if (!newsItems.length) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % newsItems.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [newsItems]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  }, [newsItems.length]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % newsItems.length);
  }, [newsItems.length]);

  // keyboard control for hero
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!newsItems.length) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [newsItems.length, goPrev, goNext]);

  const activeItem = useMemo(
    () => (newsItems.length ? newsItems[activeIndex] : null),
    [newsItems, activeIndex]
  );

  // Debounce search input for better UX
  useEffect(() => {
    const id = setTimeout(() => setSearchQuery(rawQuery.trim()), 250);
    return () => clearTimeout(id);
  }, [rawQuery]);

  const filteredItems = useMemo(() => {
    const source = newsItems;
    if (!searchQuery) return source;
    const q = searchQuery.toLowerCase();
    return source.filter(
      (n) =>
        n.title?.toLowerCase().includes(q) ||
        n.catalog?.title?.toLowerCase().includes(q)
    );
  }, [newsItems, searchQuery]);

  // Skeleton for loading states
  const SkeletonCard = () => (
    <div className="m-5 rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="h-48 w-full bg-gray-100 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
        <div className="h-5 w-3/4 bg-gray-100 animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded" />
      </div>
    </div>
  );

  return (
    <>
      <style jsx global>{`
        /* Subtle rise + fade for hero transition */
        .fade-rise {
          animation: fadeRise 480ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        @keyframes fadeRise {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.995);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Shimmer overlay on hero image */
        .hero-img::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 20%,
            rgba(0, 0, 0, 0.35) 75%
          );
          pointer-events: none;
        }

        /* Nice focus ring for buttons/links */
        .focus-ring:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.35);
        }
      `}</style>

      {/* Header */}
      <div className="container mx-auto px-4 pt-8">
        <div className="rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-12 animate-gradient-x bg-[length:200%_200%] p-6 md:p-8 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {t("news_activities")}
              </h1>
              <p className="text-white/90 mt-1">{t("Searching for news")}</p>
            </div>
            <div className="w-full md:w-96">
              <div className="relative">
                <Input
                  type="search"
                  placeholder={t("Searching for news")}
                  className="w-full bg-white/95 text-gray-800 pr-10 border-0 focus-visible:ring-2 focus-visible:ring-white/60"
                  value={rawQuery}
                  onChange={(e) => setRawQuery(e.target.value)}
                />
                <Search className="absolute right-3 inset-y-0 my-auto h-5 w-5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Hero */}
      <div className="container mx-auto px-4">
        <div className="mb-12">
          {loading && !activeItem ? (
            <div className="m-5 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="relative h-[320px] w-full bg-gray-100 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-28 bg-gray-100 animate-pulse rounded" />
                <div className="h-7 w-3/4 bg-gray-100 animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded" />
              </div>
            </div>
          ) : activeItem ? (
            <Card className="m-5 overflow-hidden rounded-2xl shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image side */}
                <div className="relative h-72 md:h-full min-h-[320px]">
                  <div className="absolute inset-0 hero-img">
                    <Image
                      key={`${activeItem.id}-img-${activeIndex}`}
                      src={`https://storage.googleapis.com/ansx/website/images/${activeItem.image}`}
                      alt={activeItem.title || "No Image"}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Controls overlay (top-left) */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <button
                      aria-label="Previous"
                      onClick={goPrev}
                      className="focus-ring rounded-full bg-white/90 hover:bg-white px-2.5 py-2 shadow-sm transition"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      aria-label="Next"
                      onClick={goNext}
                      className="focus-ring rounded-full bg-white/90 hover:bg-white px-2.5 py-2 shadow-sm transition"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-800" />
                    </button>
                  </div>

                  {/* Dots overlay (bottom-left) */}
                  <div className="absolute bottom-4 left-4 flex gap-1.5">
                    {newsItems.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setActiveIndex(i)}
                        className={clsx(
                          "h-2.5 w-2.5 rounded-full transition",
                          i === activeIndex
                            ? "bg-white"
                            : "bg-white/60 hover:bg-white/80"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Content side */}
                <CardContent
                  key={`${activeItem.id}-content-${activeIndex}`}
                  className="p-6 md:p-8 flex flex-col justify-center fade-rise"
                >
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {activeItem.createdAt
                        ? formatDate(activeItem.createdAt)
                        : activeItem.date
                        ? formatDate(activeItem.date)
                        : "---"}
                    </span>
                    {activeItem.catalog?.title && (
                      <>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span className="truncate">
                          {activeItem.catalog.title}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-3">
                    {activeItem.title || "---------------"}
                  </h2>

                  <p className="text-gray-600 mb-6">
                    {activeItem?.catalog?.title || "------------"}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openModal(activeItem)}
                      className="focus-ring inline-flex items-center px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium shadow-sm hover:bg-red-700 transition"
                    >
                      {t("read_more")}
                    </button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ) : (
            <div className="m-5 text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">{t("News not found")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Grid — only 6 news */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {loading && !!newsItems.length === false
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredItems?.slice(0, 6).map((news, index) => (
                <Card
                  key={news?.id ?? index}
                  className="m-5 overflow-hidden rounded-2xl hover:shadow-md shadow-sm border border-gray-100 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https://storage.googleapis.com/ansx/website/images/${news?.image}`}
                      alt={news.title || "news image"}
                      fill
                      className="object-cover"
                    />
                    {news?.catalog?.title && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 shadow-sm">
                        {news.catalog.title}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span className="truncate">
                        {formatDate(news.createdAt || news.date)}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {news?.catalog?.title}
                    </p>
                    <div className="flex">
                      <button
                        onClick={() => openModal(news)}
                        className="focus-ring inline-flex items-center px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-medium shadow-sm hover:bg-red-700 transition"
                      >
                        {t("read_more")}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* Empty state for filtered results */}
        {!loading && filteredItems?.length === 0 && (
          <div className="m-5 text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-600">{t("News not found")}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pb-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((prev) => Math.max(prev - 1, 1));
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={index + 1 === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <PopupModal
        isOpen={isOpen}
        onClose={closeModal}
        item={selectedItem}
        formatDate={formatDate}
      />
    </>
  );
}
