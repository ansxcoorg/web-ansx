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
import { useLocale } from "next-intl";

export default function NotificationPopup() {
  const [items, setItems] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const [fetchData, { data }] = useLazyQuery(Schema.communities, {
    fetchPolicy: "cache-and-network",
  });

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
      <DialogContent className="max-w-3xl text-center bg-transparent p-8 border-0 outline-none font-lao ">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">
            📢 ປະກາດສຳຄັນ
          </DialogTitle>
          <DialogClose className="absolute top-4 right-4 text-white hover:text-gray-300 border-0 outline-none">
            ✖
          </DialogClose>
        </DialogHeader>
        {items.length > 0 && (
          <>
            <img
              src={`https://storage.googleapis.com/ansx/website/images/${items[0]?.image}`}
              alt="Image"
              className="w-full h-auto object-cover"
            />
          </>
        )}
        <Button onClick={handleClosePopup} className="mt-4">
          ກົດເພື່ອບໍ່ໃຫ້ແຈ້ງເຕືອນອີກ
        </Button>

        <Link href={`/${locale}/news`} className="w-full">
          <Button className="mt-2 w-full bg-white text-danger border hover:bg-gray-100 rounded-lg p-2">
            <span className="text-danger">ເບິ່ງແຈ້ງການເພີ່ມ</span>
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
