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
import useEmblaCarousel from "embla-carousel-react";

export default function PapersNews() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [itemsNew, setItemsNew] = useState<any[]>([]);
  const [fetchData, { data }] = useLazyQuery(Schema.news);

  // Embla + track selected
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const openModal = (item: any) => { setSelectedItem(item); setIsOpen(true); };
  const closeModal = () => { setSelectedItem(null); setIsOpen(false); };

  useEffect(() => {
    fetchData({ variables: { where: {}, limit: 6 } });
  }, [fetchData]);

  useEffect(() => {
    if (data) setItemsNew(data?.communities?.data || []);
  }, [data]);

  /* === Auto-slide === */
  const AUTOPLAY_MS = 1800;
  const timerRef = useRef<any>(null);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (!emblaApi || itemsNew.length <= 1) return;
    stop();
    // Animayion suto slide
    const prefersReduce = typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;

    timerRef.current = setInterval(() => {
      if (document.hidden) return; // stop 
      emblaApi.scrollNext();
    }, AUTOPLAY_MS);
  }, [emblaApi, itemsNew.length, stop]);

  // function stop / start auto slide
  useEffect(() => {
    if (!emblaApi) return;
    start();
    emblaApi.on("pointerDown", stop); // slide -> stop
    emblaApi.on("settle", start);     // end -> start auto slind
    return () => {
      stop();

      emblaApi.off?.("pointerDown", stop);
      emblaApi.off?.("settle", start);
    };
  }, [emblaApi, start, stop]);

  // หยุดตอนเปิดโมดอล
  useEffect(() => {
    if (isOpen) stop();
    else start();
  }, [isOpen, start, stop]);

  return (
    <div>
      {/* Controls */}
      <div className="mb-4 flex items-right justify-end ">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={scrollPrev}>←</Button>
          <Button variant="outline" size="sm" onClick={scrollNext}>→</Button>
        </div>
      </div>

      {/* Viewport */}
      <div
        className="overflow-hidden"
        ref={emblaRef}
        onMouseEnter={stop}
        onMouseLeave={start}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") scrollPrev();
          if (e.key === "ArrowRight") scrollNext();
        }}
        aria-label="News slider"
      >
        {/* Container */}
        <div className="-ml-4 flex">
          {itemsNew.map((item, index) => {
            const isActive = index === selectedIndex;

            return (
              <div
                key={index}
                className="min-w-[85%] pl-4 md:min-w-[55%] lg:min-w-[33.3333%]"
                onClick={() => !isActive && scrollTo(index)}
              >
                <Card
                  className={[
                    "overflow-hidden transition-transform duration-500 ease-out will-change-transform",
                    isActive ? "scale-100" : "scale-[0.95]",
                  ].join(" ")}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https://storage.googleapis.com/ansx/website/images/${item?.image}`}
                      alt="News"
                      fill
                      className={[
                        "object-cover transition-all duration-500 ease-out",
                        isActive ? "blur-0 opacity-100" : "blur-[2px] opacity-70",
                      ].join(" ")}
                    />
                  </div>

                  <CardContent
                    className={[
                      "p-4 transition-all duration-500 ease-out",
                      isActive ? "opacity-100" : "opacity-80 blur-[1px]",
                    ].join(" ")}
                  >
                    <p className="mb-2 text-sm text-gray-500">
                      {formatDate(item?.createdAt) || "---"}
                    </p>
                    <h3 className="mb-2 text-lg font-semibold">
                      {item?.catalog?.title || t("no_title")}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {item?.title || t("no_description")}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(item);
                      }}
                      className="relative mt-3 block w-fit text-sm font-medium text-red-600
                                 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600
                                 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {t("read_more")}
                    </button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {itemsNew.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "w-4 bg-gray-100" : "bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
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