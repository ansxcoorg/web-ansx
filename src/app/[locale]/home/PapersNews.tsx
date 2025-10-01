"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import Schema from "../../../apollo/index";
import { useEffect, useState, useCallback, useRef } from "react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import PopupModal from "@/components/ui/PopupModal";

interface NewsItem {
  image?: string;
  createdAt?: string | Date;
  catalog?: {
    title?: string;
  };
  title?: string;
}

export default function PapersNews() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [itemsNew, setItemsNew] = useState<NewsItem[]>([]);
  const [fetchData, { data, loading }] = useLazyQuery(Schema.news);

  const openModal = (item: NewsItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  useEffect(() => {
    fetchData({ variables: { where: {}, limit: 6 } });
  }, [fetchData]);

  useEffect(() => {
    if (data) setItemsNew(data?.communities?.data || []);
  }, [data]);

  /* === Auto-slide === */
  useEffect(() => {
    fetchData({
      variables: {
        where: {},
        limit: 6,
      },
    });
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setItemsNew(data?.communities?.data || []);
    }
  }, [data]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemsNew.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={`https://storage.googleapis.com/ansx/website/images/${item?.image}`}
                alt="News"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-2">
                {item?.createdAt ? formatDate(new Date(item.createdAt)) : "---"}
              </p>
              <h3 className="text-lg font-semibold mb-2">
                {item?.catalog?.title || t("no_title")}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item?.title || t("no_description")}
              </p>
              <button
                onClick={() => openModal(item)}
                className="text-red-600 text-sm font-medium mt-3 block"
              >
                {t("read_more")}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All */}
      <div className="mt-8 text-center">
        <Link href={`/${locale}/news?page=1`}>
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
            {t("view_all")}
          </Button>
        </Link>
      </div>

      {/* Modal */}
      <PopupModal
        isOpen={isOpen}
        onClose={closeModal}
        item={selectedItem}
        formatDate={formatDate}
      />
    </div>
  );
}