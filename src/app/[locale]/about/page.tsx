import Image from "next/image";
import {
  TruckIcon,
  Award,
  ClockIcon,
  Shield,
  Heart,
  Smile,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";


export default function AboutPage() {
  const locale = useLocale();
  const t = useTranslations("about");
  return (
    <div>
      <section className="relative h-80 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/introl2.911109cb.png"
            alt="About Anousith Express"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">{t("about_us_title")}</h1>
          <p className="max-w-3xl mx-auto text-xl">
            {t("about_us_description")}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center hover:drop-shadow-lg hover:scale-105 transition-transform duration-300">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t("history_title")}</h2>
            <p className="text-gray-600 mb-4">{t("history_description")}</p>
            <p className="text-gray-600 mb-4">{t("start")}</p>
            <p className="text-gray-600">{t("service")}</p>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
            <Image
              src={`https://storage.googleapis.com/ansx/website/images/880fbffb-6d3c-4783-80fd-3628d166b3bf.jpg`}
              alt="Anousith Express History"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="bg-red-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {t("mission_title")}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-white">
              {t("mission_description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="group border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full overflow-hidden mb-4 bg-red-100">
                  <span className="absolute inset-0 bg-red-600 top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0 rounded-full" />
                  <TruckIcon className="relative z-10 h-7 w-7 text-red-600 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg]" />
                </div>

                <h3 className="text-xl font-bold mb-3">{t("title1")}</h3>
                <p className="text-gray-600">{t("description1")}</p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="group border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full overflow-hidden mb-4 bg-red-100">
                  <span className="absolute inset-0 bg-red-600 top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0 rounded-full" />
                  <Award className="relative z-10 h-7 w-7 text-red-600 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg]" />
                </div>

                <h3 className="text-xl font-bold mb-3">{t("title2")}</h3>
                <p className="text-gray-600">{t("description2")}</p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="group border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full overflow-hidden mb-4 bg-red-100">
                  <span className="absolute inset-0 bg-red-600 top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0 rounded-full" />
                  <Heart className="relative z-10 h-7 w-7 text-red-600 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg]" />
                </div>

                <h3 className="text-xl font-bold mb-3">{t("title3")}</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{t("description3")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{t("description4")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{t("description5")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{t("description6")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {t("key_points_title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <TruckIcon className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("point1_title")}</h3>
            <p className="text-gray-600">{t("point1_description")}</p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("point2_title")}</h3>
            <p className="text-gray-600">{t("point2_description")}</p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("point3_title")}</h3>
            <p className="text-gray-600">{t("point3_description")}</p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Smile className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("point4_title")}</h3>
            <p className="text-gray-600">{t("point4_description")}</p>
          </div>
        </div>
      </section>

     {/* Management Team — keep scroll-container */}
      <section className="bg-gray-50 py-16 mx-auto">
        <div className="w-full max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t("management_team")}
          </h2>

          <div
            className="
              scroll-container relative overflow-x-auto md:overflow-visible
              snap-x snap-mandatory
              before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-8 before:bg-gradient-to-r before:to-transparent
              after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-8 after:bg-gradient-to-l after:to-transparent
            "
          >
            <div
              className="
                scroll-content grid gap-8 justify-items-center
                grid-flow-col auto-cols-[15rem]
                md:grid-flow-row md:auto-cols-auto md:grid-cols-2
                lg:grid-cols-4 px-1 pb-2
              "
            >
              {/* item 1 */}
              <div className="scroll-item snap-start group w-60">
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg hover:-translate-y-0.5">
                  <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden ring-2 ring-red-200 transition group-hover:ring-red-400 group-hover:shadow-md">
                    <img
                      src="https://ext.same-assets.com/695105685/1712067103.jpeg"
                      alt="CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1"> ທ່ານ ..............</h3>
                  <p className="text-red-600/80 text-sm font-medium mb-2">
                    ຜູ້ກໍ່ຕັ້ງ ແລະ ປະທານບໍລິຫານ
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    ມີປະສົບການຫຼາຍກວ່າ 15 ປີໃນຂະແໜງໂລຈິສຕິກ ແລະ ການຂົນສົ່ງໃນລາວ
                  </p>
                </div>
              </div>

              {/* item 2 */}
              <div className="scroll-item snap-start group w-60">
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg hover:-translate-y-0.5">
                  <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden ring-2 ring-red-200 transition group-hover:ring-red-400 group-hover:shadow-md">
                    <img
                      src="https://ext.same-assets.com/329469209/2659073661.jpeg"
                      alt="COO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1"> ທ່ານ ..............</h3>
                  <p className="text-red-600/80 text-sm font-medium mb-2">ຜູ້ອຳນວຍການປະຕິບັດການ</p>
                  <p className="text-sm text-gray-600 text-center">
                    ເປັນຜູ່ຊ່ຽວຊານດ້ານການຈັດການຫ່ວງໂສ້ອຸປະທານ ແລະ ໂລຈິສຕິກ
                  </p>
                </div>
              </div>

              {/* item 3 */}
              <div className="scroll-item snap-start group w-60">
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg hover:-translate-y-0.5">
                  <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden ring-2 ring-red-200 transition group-hover:ring-red-400 group-hover:shadow-md">
                    <img
                      src="https://ext.same-assets.com/51785975/2381797199.jpeg"
                      alt="CTO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">ທ່ານ ..............</h3>
                  <p className="text-red-600/80 text-sm font-medium mb-2">ຜູ້ອຳນວຍການດ້ານເຕັກໂນໂລຢີ</p>
                  <p className="text-sm text-gray-600 text-center">
                    ຜູ່ນຳດ້ານການພັດທະນາແພລັດຟອມດິຈິຕອລແລະລະບົບຕິດຕາມສຳລັບໂລຈິສຕິກ
                  </p>
                </div>
              </div>

              {/* item 4 */}
              <div className="scroll-item snap-start group w-60">
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg hover:-translate-y-0.5">
                  <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden ring-2 ring-red-200 transition group-hover:ring-red-400 group-hover:shadow-md">
                    <img
                      src="https://ext.same-assets.com/695105685/1712067103.jpeg"
                      alt="CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1"> ທ່ານ ..............</h3>
                  <p className="text-red-600/80 text-sm font-medium mb-2">
                    ຜູ້ກໍ່ຕັ້ງ ແລະ ປະທານບໍລິຫານ
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    ມີປະສົບການຫຼາຍກວ່າ 15 ປີໃນຂະແໜງໂລຈິສຕິກ ແລະ ການຂົນສົ່ງໃນລາວ
                  </p>
                </div>
              </div>

              {/* item 5 */}
              <div className="scroll-item snap-start group w-60">
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg hover:-translate-y-0.5">
                  <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden ring-2 ring-red-200 transition group-hover:ring-red-400 group-hover:shadow-md">
                    <img
                      src="https://ext.same-assets.com/695105685/1712067103.jpeg"
                      alt="CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1"> ທ່ານ ..............</h3>
                  <p className="text-red-600/80 text-sm font-medium mb-2">
                    ຜູ້ກໍ່ຕັ້ງ ແລະ ປະທານບໍລິຫານ
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    ມີປະສົບການຫຼາຍກວ່າ 15 ປີໃນຂະແໜງໂລຈິສຕິກ ແລະ ການຂົນສົ່ງໃນລາວ
                  </p>
                </div>
              </div>

              {/* item 6 */}
              <div className="scroll-item snap-start group w-60">
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg hover:-translate-y-0.5">
                  <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden ring-2 ring-red-200 transition group-hover:ring-red-400 group-hover:shadow-md">
                    <img
                      src="https://ext.same-assets.com/329469209/2659073661.jpeg"
                      alt="COO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1"> ທ່ານ ..............</h3>
                  <p className="text-red-600/80 text-sm font-medium mb-2">ຜູ້ອຳນວຍການປະຕິບັດການ</p>
                  <p className="text-sm text-gray-600 text-center">
                    ເປັນຜູ່ຊ່ຽວຊານດ້ານການຈັດການຫ່ວງໂສ້ອຸປະທານ ແລະ ໂລຈິສຕິກ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/about`}>
            <Button className="bg-red-600 hover:bg-red-700">
              {t("contact_us")}
            </Button>
          </Link>
          <Link href={`/${locale}/pricing`}>
            <Button
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              {t("view_services")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
