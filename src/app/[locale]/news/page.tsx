"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [newsItems, setNewsItems] = useState<newsItem[]>([]);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(7);
  const [totalPages, setTotalPages] = useState(1);

  const [fetchData, { data }] = useLazyQuery(Schema.news, {
    fetchPolicy: "cache-and-network",
  });

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [page]);

  const openModal = (news :any) => {
    setSelectedItem(news);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t("news_activities")} </h1>

        <div className="mb-8 max-w-lg">
          <div className="relative">
            <Input
              type="search"
              placeholder={t("Searching for news")}
              className="w-full bg-gray-50 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-12">
          {newsItems?.[0] ? (
            <Card className="overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <Image
                    src={`https://storage.googleapis.com/ansx/website/images/${newsItems[0].image}`}
                    alt={newsItems[0].title || "No Image"}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <CardContent className="p-6 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {newsItems[0].createdAt
                        ? formatDate(newsItems[0].createdAt)
                        : "---"}
                    </span>
                    {newsItems[0].catalog?.title && (
                      <>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{newsItems[0].catalog.title}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    {newsItems[0].title || "---------------"}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {newsItems[0]?.catalog?.title || "------------"}
                  </p>
                  <button
                    onClick={() => openModal(newsItems[0])}
                    className="text-red-600 text-sm font-medium mt-3 block text-left"
                  >
                    {t("read_more")}
                  </button>
                </CardContent>
              </div>
            </Card>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">{t("News not found")}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {newsItems?.slice(1)?.map((news, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={`https://storage.googleapis.com/ansx/website/images/${news?.image}`}
                  alt={news.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(news.date)}</span>
                  {news.catalog.title && (
                    <>
                      <span className="mx-1">•</span>
                      <User className="h-3 w-3 mr-1" />
                      <span>{news.catalog.title}</span>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {news.catalog.title}
                </p>
                <button
                  onClick={() => openModal(news)}
                  className="text-red-600 text-sm font-medium mt-3 block"
                >
                  {t("read_more")}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => {
                    setPage((prev) => Math.max(prev - 1, 1));
                  }}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={index + 1 === page}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => {
                    setPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
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
