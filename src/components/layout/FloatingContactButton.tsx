"use client";

import { useEffect, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { useTranslations } from "next-intl";
import ChatComponent from "@/app/[locale]/contact/ChatComponent";

export default function FloatingContactButton() {
  const t = useTranslations("contact");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const onToggle = () => setOpen((v) => !v);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("ansx:openChat", onOpen as EventListener);
    window.addEventListener("ansx:closeChat", onClose as EventListener);
    window.addEventListener("ansx:toggleChat", onToggle as EventListener);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("ansx:openChat", onOpen as EventListener);
      window.removeEventListener("ansx:closeChat", onClose as EventListener);
      window.removeEventListener("ansx:toggleChat", onToggle as EventListener);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      {/* open/close chat box button (toggle) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("contact_us")}
        aria-expanded={open}
        aria-pressed={open}
        className="fixed bottom-6 right-4 z-[70] flex items-center gap-2 px-5 py-2 rounded-full
               border border-black/20 shadow-md text-white font-medium transition-all duration-300
               active:scale-95 bg-red-700/90 hover:bg-red-600"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="hidden sm:inline">{t("contact_us")}</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[55] bg-black/20"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed bottom-20 right-4 z-[60] w-[350px] max-w-[90vw]">
            <div
              className="relative rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
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
        </>
      )}
    </>
  );
}
