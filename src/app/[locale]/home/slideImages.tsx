"use client";

import { useLazyQuery } from "@apollo/client";
import Schema from "../../../apollo/index";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface SlideImage {
  image: string;
}

export default function SlideImages() {
  const t = useTranslations("SlideIMages");
  const [slideImg, setSlideImg] = useState<SlideImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [fetchData, { data, loading }] = useLazyQuery(Schema.slideImg);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      slideImg.length === 0 ? 0 : (prev - 1 + slideImg.length) % slideImg.length
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      slideImg.length === 0 ? 0 : (prev + 1) % slideImg.length
    );
  };

  useEffect(() => {
    fetchData({
      variables: {
        where: {},
        limit: 10,
      },
    });
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setSlideImg(data?.slideImages?.data || []);
    }
  }, [data]);

  useEffect(() => {
    if (slideImg.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImg.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [slideImg]);

  return (
    <Carousel className="relative w-full overflow-hidden">
      <CarouselContent className="relative h-[350px] sm:h-[440px] md:h-[480px] lg:h-[540px]">
        {slideImg?.map((item, index) => (
          <CarouselItem key={index} className="basis-full">
            <div
              className={`absolute inset-0 mx-auto flex h-full w-full items-center justify-center overflow-hidden transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "pointer-events-none opacity-0 scale-105"
              }`}
            >
              <img
                src={`https://storage.googleapis.com/ansx/website/images/${item?.image}`}
                alt="post-slider"
                className="h-full w-full object-cover"
              />
              {/* <div className="absolute inset-0 bg-black/40 "></div> */}
            </div>
          </CarouselItem>
        ))}

        <form
          action="https://app.anousith.express/nextday/item_bill/search_item"
          method="get"
          className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex"
        >
          <div className="pointer-events-auto mt-60 w-full max-w-4xl px-4 text-center text-white">
            <div className="w-full rounded-3xl bg-white p-3 shadow-lg shadow-dark-600/15">
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="_bill_detail"
                  placeholder={t("tracking_placeholder")}
                  className="w-full rounded-md p-2 text-black outline-none ring-0 focus:outline-none focus:ring-0"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />

                <input type="hidden" name="n_home" value="2" />

                <Button
                  type="submit"
                  className="h-10 items-center gap-2 rounded-3xl bg-red-600 px-5 text-white hover:bg-red-700"
                >
                  {t("tracking")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CarouselContent>

      <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full ">
          {slideImg.map((_, index) => {
            const isActive = index === currentSlide;

            return (
              <div
                key={index}
                className={[
                  "h-2.5 rounded-full transition-all duration-300 ease-out shadow-sm",
                  isActive
                    ? "w-6 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/70",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md shadow-lg hover:bg-black/60 transition"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md shadow-lg hover:bg-black/60 transition"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </Carousel>
  );
}
