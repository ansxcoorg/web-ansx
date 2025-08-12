"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { useTranslations } from "next-intl";
import ChatComponent from "@/app/[locale]/contact/ChatComponent";

export default function FloatingContactButton() {
  const t = useTranslations("contact");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t("contact_us")}
        className="fixed bottom-6 right-4 z-50 flex items-center gap-2 px-5 py-2 rounded-full bg-red-700/90 border border-black/20
                   shadow-md text-white font-medium transition-all duration-300 hover:bg-red-600 active:scale-95"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="hidden sm:inline">{t("contact_us")}</span>
      </button>
      {open && (
        <div className="fixed bottom-20 right-4 z-[60] w-[350px] max-w-[90vw]">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 bg-white text-gray-700 rounded-full p-1 shadow-md"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <ChatComponent onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
