// components/PopupModal.jsx
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PopupModal({
  isOpen,
  onClose,
  item,
  formatDate,
}: {
  isOpen: any;
  onClose: any;
  item: any | null;
  formatDate: any;
}) {
  const t = useTranslations("news");
  if (!item) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="popup-modal fixed z-50 inset-0 overflow-y-auto font-lao"
    >
      <div className="flex items-center justify-center min-h-screen p-4 bg-black/40 backdrop-blur-sm">
        <Dialog.Panel className="relative bg-white rounded-2xl p-6 max-w-xl w-full shadow-xl animate-fade-in-up transition-all duration-300">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              📢 {t("Announcement")}
            </h2>
          </div>

          <div className="relative w-full mb-5 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <img
              src={`https://storage.googleapis.com/ansx/website/images/${item?.image}`}
              alt="photo"
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {item?.catalog?.title}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed">
              {item?.title}
            </p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}