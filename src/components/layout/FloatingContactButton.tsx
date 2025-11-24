"use client";

import { useEffect, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { useTranslations } from "next-intl";
import ChatComponent from "@/app/[locale]/contact/ChatComponent";
import { FaApple, FaAndroid } from "react-icons/fa6";
import ANS from "../../img/ans-logo.png";
import ANS_Download from "../../img/IOS_ANDROID_DOWNLOAD.png";

export default function FloatingContactButton() {
  const t = useTranslations("contact");
  const [open, setOpen] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

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
      {!open && (
        <div
          onClick={() => setShowDownload((prev) => !prev)}
          className=" fixed bottom-[80px] right-2 z-[100] cursor-pointer select-none transition-all duration-300 hover:scale-[1.05]  loop-up-down"
        >
          <div className="relative flex items-center">
            {!showDownload && (
              <div className="relative flex h-[110px] w-[110px] items-center justify-center flip-right">
                <div
                  className="relative h-14 w-14 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, #ff3b30, #6b7280, #d1d5db, #ff3b30)",
                    padding: "4.5px",
                    boxShadow: "0 0 25px rgba(255, 59, 48, 0.4)",
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                    <img src={ANS.src} className="h-10 w-10 object-contain" />
                  </div>
                </div>

                <div
                  className="absolute text-[10px] font-semibold tracking-[2px] text-gray-800 animate-spin-slow"
                  style={{ transform: "rotate(333deg)" }}
                >
                  {[..."DOWNLOAD ANOUSITH APP "].map((char, i, arr) => (
                    <span
                      key={i}
                      className="absolute left-1/2 top-1/2 inline-block"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${(360 / arr.length) * i
                          }deg) translateY(-38px)`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {showDownload && (
              <div className="mr-3 flex items-center relative flip-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDownload(false);
                  }}
                  className="absolute -top-2 -right-2 z-[200] h-6 w-6 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-500 text-[12px]  transition-all duration-200 hover:bg-red-500 hover:text-white hover:shadow-lg"
                >
                  ✕
                </button>

                <div className="flex items-center gap-4 min-w-[280px] max-w-[320px] rounded-2xl border border-red-100/70 bg-white px-5 py-4 shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  <img
                    src={ANS_Download.src}
                    className="h-[105px] w-[105px] object-contain transition-all duration-1000 hover:scale-125"
                  />

                  <div className="flex flex-1 flex-col justify-center leading-tight">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-500">
                      {t("Download")}
                    </span>

                    <span className="mt-1 text-[15px] font-semibold text-gray-900">
                      {t("scan")}
                    </span>

                    <span className="mt-1 text-[11px] text-gray-500">
                      {t("detail")}
                    </span>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <a
                        href="https://apps.apple.com/la/app/anousith-express/id6745592067"
                        className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium text-gray-600 border border-gray-300 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:scale-105 hover:text-black"
                      >
                        <FaApple size={11} />
                        iOS
                      </a>

                      <a
                        href="https://qrco.de/ans-app-android"
                        className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium text-green-500 border border-green-300 shadow-sm transition-all duration-200 hover:bg-green-50 hover:shadow-md hover:scale-105 hover:text-green-600"
                      >
                        <FaAndroid size={11} />
                        Android
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("contact_us")}
        aria-expanded={open}
        aria-pressed={open}
        className="fixed bottom-6 right-7 z-[70] flex items-center gap-2 px-5 py-2 rounded-full
               border border-black/20 shadow-md text-white font-medium transition-all duration-300
               active:scale-95 bg-red-700/90 hover:bg-red-600 "
      >
        <MessageSquare className="h-5" />
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
