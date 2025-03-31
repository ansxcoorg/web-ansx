"use client";

import { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import Schema from "../../apollo/index";

export default function NotificationPopup() {
  const [items, setItems] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(true);
  const pathname = usePathname();
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
  //   useEffect(() => {
  //     if (pathname === "/") {
  //       const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

  //       if (hasSeenPopup) {
  //         setShowPopup(false);
  //       } else {
  //         sessionStorage.setItem("hasSeenPopup", "true");
  //       }

  //       return;
  //     }

  //     setShowPopup(true);

  //     const handleBeforeUnload = () => {
  //       sessionStorage.removeItem("hasSeenPopup");
  //     };

  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //     return () => {
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     };
  //   }, [pathname]);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem("hasSeenPopup", "true");
    }

    const handleBeforeUnload = () => {
      sessionStorage.removeItem("hasSeenPopup");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="max-w-3xl text-center bg-transparent p-8 border-none ">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">📢 ປະກາດສຳຄັນ</DialogTitle>
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
        <Button onClick={() => setShowPopup(false)} className="mt-4">
          ປິດໜ້າຕ່າງນີ້
        </Button>
        <Button
          onClick={() => setShowPopup(false)}
          className="mt-2 bg-white text-danger border hover:bg-gray-100 rounded-lg p-2"
        >
          <span className="text-danger">ເບິ່ງແຈ້ງການເພີ່ມ</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
