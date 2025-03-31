"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { ImInstagram } from "react-icons/im";
import DownloadAPP from "../../img/IOS_ANDROID_DOWNLOAD.png";
import Logo from "../../img/logo_next_day.png";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#f6f7f7] border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 relative h-12 w-40">
              <Image
                src={Logo}
                alt="Anousith Express Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Anousith Express ບໍລິການຮັບສົ່ງພັດສະດຸແລະເຄື່ອງທົ່ວປະເທດລາວ ແລະ
              ສາກົນ
            </p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="mr-2 h-4 w-4" />
              <span>ນະຄອນຫຼວງວຽງຈັນ, ລາວ</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Phone className="mr-2 h-4 w-4" />
              <span>+856 20 97285066</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Phone className="mr-2 h-4 w-4" />
              <span>ສາຍດ່ວນ: 1355</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="mr-2 h-4 w-4" />
              <span>anousithlogistic@gmail.com</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">ລິ້ງດ່ວນ</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/news"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  ລາຍງານ ແລະ ຂ່າວສານ
                </Link>
              </li>
              <li>
                <Link
                  href="/branches"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  ສາຂາທັງໝົດ
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  ຄ່າບໍລິການ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  ກ່ຽວກັບພວກເຮົາ
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  ຮ່ວມງານກັບພວກເຮົາ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  ຕິດຕໍ່ພວກເຮົາ
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  ນະໂຍບາຍຕ່າງໆ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">ແອັບມືຖື</h3>
            <p className="text-sm text-gray-600 mb-4">
              ດາວໂຫຼດແອັບມືຖືຂອງພວກເຮົາເພື່ອປະສົບການທີ່ດີຂຶ້ນ
            </p>
            <div className="relative h-56 w-full">
              <Image
                src={DownloadAPP}
                alt="Download mobile app"
                layout="fill"
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">ຂໍ້ມູນເພີ່ມເຕີມ</h3>
            <div className="flex space-x-4">
              <a
              
                href="https://www.facebook.com/AnousithExpress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@ans_express"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <SiTiktok className="h-6 w-6" />
              </a>
            </div>
            <p className="text-sm text-gray-600">
              ຕິດຕາມຂ່າວສານແລະການບໍລິການໃໝ່ລ່າສຸດ
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {currentYear} Anousith Express | All rights reserved | Design by
            ANS TECH
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              ເງື່ອນໄຂການໃຊ້ບໍລິການ
            </Link>
            <Link
              href="/policy"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
