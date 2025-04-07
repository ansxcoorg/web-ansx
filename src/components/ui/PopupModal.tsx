// components/PopupModal.jsx
import { Dialog, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";
import { DialogHeader } from "./dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export default function PopupModal({ isOpen, onClose, item, formatDate }) {
  if (!item) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto font-lao"
    >
      <div className="flex items-center justify-center min-h-screen p-6 bg-black/40 backdrop-blur-sm">
        <Dialog.Panel className="relative bg-white rounded-3xl p-10 max-w-5xl w-full shadow-2xl animate-fade-in-up transition-all duration-300">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors duration-200"
            aria-label="Close"
          >
            ✖
          </button>

          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
              📢 ປະກາດຂ່າວສານ
            </h2>
          </div>

          {/* Image */}
          <div className="relative w-full mb-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <img
              src={`https://storage.googleapis.com/ansx/website/images/${item?.image}`}
              alt="photo"
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {item?.catalog?.title}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {item?.title}
            </p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
