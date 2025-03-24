import Image from "next/image";
import {
  TruckIcon,
  Award,
  ClockIcon,
  UsersIcon,
  MapIcon,
  Shield,
  Heart,
  Smile,
  CheckCircle2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ext.same-assets.com/1812905475/1516298680.jpeg"
            alt="About Anousith Express"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">ກ່ຽວກັບພວກເຮົາ</h1>
          <p className="max-w-3xl mx-auto text-xl">
            Anousith Express - ບໍລິການຂົນສົ່ງທີ່ໄວ, ປອດໄພ ແລະ ເຊື່ອຖືໄດ້ ທົ່ວປະເທດລາວ ແລະ ສາກົນ
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
          <div>
            <h2 className="text-3xl font-bold mb-6">ປະຫວັດຄວາມເປັນມາ</h2>
            <p className="text-gray-600 mb-4">
              Anousith Express ໄດ້ກໍ່ຕັ້ງຂຶ້ນໃນປີ 2015 ໂດຍມີຈຸດປະສົງເພື່ອສະໜອງການບໍລິການຂົນສົ່ງທີ່ມີຄຸນນະພາບສູງ, ສະດວກ ແລະ ໃນລາຄາທີ່ເໝາະສົມໃຫ້ແກ່ທຸລະກິດ ແລະ ບຸກຄົນທົ່ວປະເທດລາວ.
            </p>
            <p className="text-gray-600 mb-4">
              ຈາກການເລີ່ມຕົ້ນດ້ວຍສາຂາພຽງ 5 ແຫ່ງໃນນະຄອນຫຼວງວຽງຈັນ, ພວກເຮົາໄດ້ຂະຫຍາຍຕົວຢ່າງໄວວາຈົນມີເຄືອຂ່າຍສາຂາຫຼາຍກວ່າ 400+ ແຫ່ງໃນປັດຈຸບັນ, ຄອບຄຸມທຸກແຂວງໃນປະເທດລາວ ແລະ ເຊື່ອມຕໍ່ກັບເຄືອຂ່າຍສາກົນ.
            </p>
            <p className="text-gray-600">
              ດ້ວຍທີມງານທີ່ມີປະສົບການ ແລະ ເຕັກໂນໂລຢີທີ່ທັນສະໄໝ, ພວກເຮົາໄດ້ກາຍເປັນໜຶ່ງໃນຜູ້ນຳດ້ານບໍລິການໂລຈິສຕິກ ແລະ ຂົນສົ່ງໃນປະເທດລາວ, ບໍລິການຫຼາຍກວ່າ 1 ລ້ານລາຍການຕໍ່ເດືອນ.
            </p>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
            <Image
              src="https://ext.same-assets.com/1075285828/1113901614.jpeg"
              alt="Anousith Express History"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ພາລະກິດ, ວິໄສທັດ ແລະ ຄຸນຄ່າ</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ທຸກການກະທຳ ແລະ ການຕັດສິນໃຈຂອງພວກເຮົາໄດ້ຮັບການຊີ້ນຳໂດຍຫຼັກການພື້ນຖານຂອງພວກເຮົາ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="bg-red-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <TruckIcon className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">ພາລະກິດ</h3>
                <p className="text-gray-600">
                  ສະໜອງການບໍລິການຂົນສົ່ງທີ່ມີປະສິດທິພາບສູງສຸດ, ເຊື່ອຖືໄດ້, ປອດໄພ, ທັນເວລາ ໃນລາຄາທີ່ເໝາະສົມ ເພື່ອເຊື່ອມໂຍງທຸລະກິດ ແລະ ຜູ້ຄົນໃນລາວ ແລະ ພາກພື້ນ.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="bg-red-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Award className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">ວິໄສທັດ</h3>
                <p className="text-gray-600">
                  ເປັນຜູ້ນຳດ້ານໂລຈິສຕິກ ແລະ ຂົນສົ່ງທີ່ໃຊ້ເຕັກໂນໂລຢີຊັ້ນນຳຂອງລາວ, ສ້າງຄວາມເຊື່ອມໂຍງທີ່ຫນ້າເຊື່ອຖືທີ່ສຸດລະຫວ່າງຜູ້ຄົນ, ທຸລະກິດ ແລະ ຊຸມຊົນ.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="bg-red-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Heart className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">ຄຸນຄ່າ</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>ຄວາມເຊື່ອຖືໄດ້ ແລະ ຄວາມໄວ້ວາງໃຈ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>ຄວາມປອດໄພ ແລະ ຄວາມຮັບຜິດຊອບ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>ຄວາມພຶງພໍໃຈຂອງລູກຄ້າ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>ນະວັດຕະກຳ ແລະ ການປັບປຸງຢ່າງຕໍ່ເນື່ອງ</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">ຈຸດເດັ່ນຂອງພວກເຮົາ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <TruckIcon className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ເຄືອຂ່າຍກວ້າງຂວາງ</h3>
            <p className="text-gray-600">
              ມີສາຂາຫຼາຍກວ່າ 400+ ແຫ່ງທົ່ວປະເທດລາວ ຄອບຄຸມທຸກແຂວງ ແລະ ບັນດາເມືອງຫຼັກ
            </p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ບໍລິການໄວວາ</h3>
            <p className="text-gray-600">
              ຈັດສົ່ງພາຍໃນມື້ດຽວສຳລັບເຂດນະຄອນຫຼວງ ແລະ 1-3 ວັນສຳລັບຕ່າງແຂວງ
            </p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ປອດໄພ ແລະ ໜ້າເຊື່ອຖື</h3>
            <p className="text-gray-600">
              ລະບົບຕິດຕາມແບບ real-time ແລະ ການປະກັນພັດສະດຸເພື່ອຄວາມໝັ້ນໃຈ
            </p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Smile className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ລູກຄ້າເປັນສູນກາງ</h3>
            <p className="text-gray-600">
              ການບໍລິການລູກຄ້າທີ່ເປັນເລີດ 24/7 ແລະ ແອັບມືຖືທີ່ໃຊ້ງານງ່າຍ
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">ທີມງານຜູ້ບໍລິຫານ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://ext.same-assets.com/695105685/1712067103.jpeg"
                  alt="CEO"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">ທ່ານ ອານຸສິດ ວິໄລພົນ</h3>
                <p className="text-gray-500 mb-3">ຜູ້ກໍ່ຕັ້ງ ແລະ ປະທານບໍລິຫານ</p>
                <p className="text-sm text-gray-600">
                  ມີປະສົບການຫຼາຍກວ່າ 15 ປີໃນຂະແໜງໂລຈິສຕິກ ແລະ ການຂົນສົ່ງໃນລາວ
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://ext.same-assets.com/329469209/2659073661.jpeg"
                  alt="COO"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">ທ່ານ ສົມພອນ ພົມມະຈັນ</h3>
                <p className="text-gray-500 mb-3">ຜູ້ອຳນວຍການປະຕິບັດການ</p>
                <p className="text-sm text-gray-600">
                  ເປັນຜູ້ຊ່ຽວຊານດ້ານການຈັດການຫ່ວງໂສ້ອຸປະທານ ແລະ ໂລຈິສຕິກ
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://ext.same-assets.com/51785975/2381797199.jpeg"
                  alt="CTO"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">ທ່ານ ນ. ວິໄລພອນ ສິດທິວົງ</h3>
                <p className="text-gray-500 mb-3">ຜູ້ອຳນວຍການດ້ານເຕັກໂນໂລຢີ</p>
                <p className="text-sm text-gray-600">
                  ຜູ້ນຳດ້ານການພັດທະນາແພລັດຟອມດິຈິຕອລແລະລະບົບຕິດຕາມສຳລັບໂລຈິສຕິກ
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          ພ້ອມຮັບໃຊ້ທ່ານໃນທຸກຄວາມຕ້ອງການດ້ານການຂົນສົ່ງ
        </h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          ບໍ່ວ່າທ່ານຈະເປັນທຸລະກິດຂະໜາດນ້ອຍ, ລາຍໃຫຍ່ ຫຼື ບຸກຄົນ, ພວກເຮົາມີທາງອອກການຂົນສົ່ງທີ່ເໝາະສົມກັບທຸກຄວາມຕ້ອງການຂອງທ່ານ.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-red-600 hover:bg-red-700">
            ຕິດຕໍ່ພວກເຮົາ
          </Button>
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
            ເບິ່ງບໍລິການຂອງພວກເຮົາ
          </Button>
        </div>
      </section>
    </div>
  );
}
