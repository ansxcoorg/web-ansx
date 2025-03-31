"use client";

import { useLazyQuery } from "@apollo/client";
import Schema from "../../apollo/index";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface SlideImage {
  image: string;
}

export default function SlideImages() {
  const [slideImg, setSlideImg] = useState<SlideImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [fetchData, { data, loading }] = useLazyQuery(Schema.slideImg);

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
    <Carousel className="w-full">
      <CarouselContent>
        {slideImg?.map((item, index) => (
          <CarouselItem
            key={index}
            className={index === currentSlide ? "block" : "hidden"}
          >
            <div className="relative h-[80vh] w-[100%] mx-auto flex items-center justify-center overflow-hidden">
              <Image
                src={`https://storage.googleapis.com/ansx/website/images/${item?.image}`}
                alt="post-slider"
                fill
                priority
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
        <form
          action="https://app.anousith.express/landing/search_tracking/search_item"
          method="get"
          className="absolute inset-0 flex items-center justify-center mt-60 hidden md:flex"
        >
          <div className="text-center text-white max-w-4xl px-4 w-full">
            <div className="bg-white rounded-lg shadow-lg p-3 w-full">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="ເລກພັດສະດຸ ຫຼື ເບີໂທລະສັບ..."
                  className="w-full p-2 text-black rounded-md outline-none ring-0 focus:ring-0 focus:outline-none"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
                <Button
                  type="submit"
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  ຕິດຕາມພັດສະດຸ
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CarouselContent>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex space-x-2">
          {slideImg.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
