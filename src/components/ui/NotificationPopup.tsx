"use client";

import { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import Schema from "../../apollo/index";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function NotificationPopup() {
  const [items, setItems] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const [fetchData, { data }] = useLazyQuery(Schema.communities, {
    fetchPolicy: "cache-and-network",
  });

  const t = useTranslations("news");

  useEffect(() => {
    fetchData({
      variables: {
        where: {
          isVideo: 0,
          catalog: 20,
        },
      },
    });
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setItems(data?.communities?.data || []);
    }
  }, [data]);
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

    if (!hasSeenPopup) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("hasSeenPopup", "true");
  };

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="  text-center bg-transparent p-8 border-none shadow-none outline-none font-lao ">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">
            📢 {t("Announcement")}
          </DialogTitle>
          <DialogClose className="absolute top-7 right-7 flex items-center justify-center w-9 h-9 rounded-full bg-white/20 text-white hover:bg-[#a0000c]/30 transition-all duration-200 outline-none shadow-md">
            ✖
          </DialogClose>
        </DialogHeader>
        {items.length > 0 && (
          <div className="w-full flex flex-col items-center  ">
            <div className="w-full">
              <img
                src={`https://storage.googleapis.com/ansx/website/images/${items[0]?.image}`}
                alt="Announcement"
                className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            <div className="w-full mt-3 space-y-2">
              <Button
                onClick={handleClosePopup}
                className="w-full h-11 rounded-lg font-medium"
              >
                ກົດເພື່ອບໍ່ໃຫ້ແຈ້ງເຕືອນອີກ
              </Button>

              <Link href={`/${locale}/news`} className="w-full block">
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-lg font-medium bg-white text-[#b7010e] border-white hover:bg-white/90"
                >
                  <span className="text-[#b7010e]">ເບິ່ງແຈ້ງການເພີ່ມ</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
