import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  PhoneCall,
  Navigation,
  Package,
  Truck,
  Clock,
  MapPin,
} from "lucide-react";
import SlideImages from "./home/slideImages";
import PapersNews from "./home/PapersNews";
import PackagePrice from "./home/packageprice";

const formatDate = () => {
  const date = new Date();
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return { day, month, year };
};

export default function Home() {
  const { day, month, year } = formatDate();

  return (
    <div>
      <section className="mb-12">
        <SlideImages />
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">
          ຈຸດເດັ່ນຂອງການບໍລິການ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-red-100 p-4 mb-4">
                <Truck className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ຈັດສົ່ງທົ່ວປະເທດ</h3>
              <p className="text-gray-600 text-sm">
                ບໍລິການຈັດສົ່ງຄອບຄຸມທຸກແຂວງທົ່ວປະເທດລາວ
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-red-100 p-4 mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ໄວວາທັນໃຈ</h3>
              <p className="text-gray-600 text-sm">
                ຈັດສົ່ງໄວພາຍໃນວັນດຽວສຳລັບເຂດນະຄອນຫຼວງ ແລະ 1-3 ວັນສຳລັບຕ່າງແຂວງ
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-red-100 p-4 mb-4">
                <Package className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">COD ໂອນໄວ</h3>
              <p className="text-gray-600 text-sm">
                ບໍລິການເກັບເງິນປາຍທາງ ໂອນເງິນໄວພາຍໃນ 1-2 ວັນ
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-red-100 p-4 mb-4">
                <Navigation className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ຕິດຕາມງ່າຍ</h3>
              <p className="text-gray-600 text-sm">
                ຕິດຕາມພັດສະດຸໄດ້ຕະຫຼອດ 24 ຊົ່ວໂມງຜ່ານແອັບມືຖື ຫຼື ເວັບໄຊທ໌
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-red-600 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl text-white font-bold mb-8">
            ຂ່າວສານ ແລະ ກິດຈະກຳ
          </h2>
          <PapersNews />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">ລາຄາບໍລິການຫຼັກ</h2>
        <PackagePrice />
      </section>

      <section className="bg-red-600 text-white py-12 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ໃຫ້ພວກເຮົາຊ່ວຍທ່ານໃນການຂົນສົ່ງສິນຄ້າ
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            ບໍລິການທີ່ໄວ, ປອດໄພ ແລະ ໃນລາຄາທີ່ເໝາະສົມ. ມີສາຂາຫຼາຍກວ່າ 400
            ແຫ່ງທົ່ວປະເທດ ພ້ອມໃຫ້ບໍລິການທ່ານ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-gray-100">
              <PhoneCall className="mr-2 h-4 w-4" />
              ຕິດຕໍ່ພວກເຮົາ
            </Button>
            <Link href="/branches">
              <Button className="bg-white text-red-600 hover:bg-gray-100">
                <MapPin className="mr-2 h-4 w-4" />
                ຄົ້ນຫາສາຂາໃກ້ບ້ານ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
