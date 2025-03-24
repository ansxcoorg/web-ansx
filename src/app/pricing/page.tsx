"use client";

import { useState } from "react";
import { Search, Filter, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PricingItem {
  id: number;
  item: string;
  price: string;
}

// Pricing data
const standardPricing: PricingItem[] = [
  { id: 1, item: "ຫີບຫໍ່ / ກ່ອງຂະໜາດ 8 ກກ", price: "80,000" },
  { id: 2, item: "ຫີບຫໍ່ / ກ່ອງຂະໜາດ 6 ກກ", price: "60,000" },
  { id: 3, item: "ຫີບຫໍ່ / ກ່ອງຂະໜາດ 4 ກກ", price: "40,000" },
  { id: 4, item: "ຫີບຫໍ່ / ກ່ອງຂະໜາດ 2 ກກ", price: "20,000" },
  { id: 5, item: "ຫີບຫໍ່ / ກ່ອງຂະໜາດ 1 ກກ", price: "10,000" },
  { id: 6, item: "ກະເປົາ 1 ໜ່ວຍ", price: "150,000" },
  { id: 7, item: "ລົດຈັກຂະໜາດ 16-20 ນິ້ວ", price: "180,000" },
  { id: 8, item: "ລົດຈັກຂະໜາດ 11-15 ນິ້ວ", price: "150,000" },
  { id: 9, item: "ລົດຖີບ WAVE 100 / WAVE I", price: "650,000" },
  { id: 10, item: "ເຄື່ອງໃຊ້ໄຟຟ້າ (251 - 350 cm)", price: "350,000" },
];

const electronicsAndDevices: PricingItem[] = [
  { id: 11, item: "ເຄື່ອງໃຊ້ໄຟຟ້າ (251 - 350 cm)", price: "350,000" },
  { id: 12, item: "ເຄື່ອງໃຊ້ໄຟຟ້າ (ຈາກ 201 - 250 cm)", price: "250,000" },
  { id: 13, item: "ເຄື່ອງໃຊ້ໄຟຟ້າ (100 - 200 cm)", price: "150,000" },
  { id: 14, item: "ໂທລະສັບມືຖື (61kg-80kg)", price: "500,000" },
  { id: 15, item: "ໂທລະສັບມືຖື (51kg-60kg)", price: "350,000" },
];

const furnitureAndLarge: PricingItem[] = [
  { id: 16, item: "ໂຊຟາຊຸດ (ໃຫຍ່) 2 ຊຸດ", price: "130,000" },
  { id: 17, item: "ຕູ້ເຢັນຂະໜາດ 1 ຊຸດ", price: "80,000" },
  { id: 18, item: "ເຄື່ອງຊັກຜ້າ 10 ກິໂລ", price: "100,000" },
  { id: 19, item: "ເຄື່ອງຊັກຜ້າ 8 ກິໂລ", price: "80,000" },
  { id: 20, item: "ເຄື່ອງຊັກຜ້າ 6 ກິໂລ", price: "60,000" },
];

const vehiclesAndParts: PricingItem[] = [
  { id: 21, item: "ລົດຖີບ (ໃຫຍ່) 1 ຄັນ", price: "120,000" },
  { id: 22, item: "ລົດຖີບ 4 ຄັນ", price: "40,000" },
  { id: 23, item: "ລົດຖີບ 2 ຄັນ", price: "20,000" },
  { id: 24, item: "ລົດຈັກ (251 - 350 cm)", price: "400,000" },
  { id: 25, item: "ມໍເຕີໄຊ (ໃຫຍ່) (201-250cm)", price: "350,000" },
];

const specialPackages: PricingItem[] = [
  { id: 26, item: "ລາຄາສິນຄ້າພິເສດ (150,000)", price: "150,000" },
  { id: 27, item: "ລາຄາສິນຄ້າພິເສດ (100,000)", price: "100,000" },
  { id: 28, item: "ລາຄາສິນຄ້າພິເສດ (500,000)", price: "500,000" },
  { id: 29, item: "ລາຄາສິນຄ້າພິເສດ (450,000)", price: "450,000" },
  { id: 30, item: "ລາຄາສິນຄ້າພິເສດ (400,000)", price: "400,000" },
];

export default function PricingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filterPricing = (items: PricingItem[]) => {
    if (!searchQuery.trim()) return items;

    return items.filter((item) =>
      item.item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ລາຄາຄ່າບໍລິການ</h1>

      {/* Search Box */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="ຄົ້ນຫາລາຄາສິນຄ້າ..."
            className="w-full bg-gray-50 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          ກັ່ນຕອງ
        </Button>
      </div>

      {/* COD Info Box */}
      <div className="mb-8 bg-red-50 border border-red-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-red-600 flex items-center">
          <Package className="h-5 w-5 mr-2" />
          ບໍລິການເກັບເງິນປາຍທາງ (COD)
        </h2>
        <p className="text-gray-700 mb-3">
          ຄ່າບໍລິການເກັບເງິນປາຍທາງພຽງແຕ່ 1,000 ກີບ ຕໍ່ການສົ່ງແຕ່ລະຄັ້ງ, ໂອນເງິນພາຍໃນ 1-2 ວັນທຳການ
        </p>
        <Button className="bg-red-600 hover:bg-red-700">
          ລົງທະບຽນໃຊ້ບໍລິການ
        </Button>
      </div>

      {/* Pricing Tabs */}
      <Tabs defaultValue="standard" className="mb-8">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="standard">ສິນຄ້າທົ່ວໄປ</TabsTrigger>
          <TabsTrigger value="electronics">ອຸປະກອນອີເລັກໂຕຣນິກ</TabsTrigger>
          <TabsTrigger value="furniture">ເຟີນີເຈີ</TabsTrigger>
          <TabsTrigger value="vehicles">ຍານພາຫະນະ</TabsTrigger>
          <TabsTrigger value="special">ພັດສະດຸພິເສດ</TabsTrigger>
        </TabsList>

        <TabsContent value="standard">
          <div className="overflow-x-auto">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="w-10">#</th>
                  <th>ລາຍການ</th>
                  <th className="text-right">ລາຄາ (ກີບ)</th>
                </tr>
              </thead>
              <tbody>
                {filterPricing(standardPricing).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.item}</td>
                    <td className="price">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="electronics">
          <div className="overflow-x-auto">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="w-10">#</th>
                  <th>ລາຍການ</th>
                  <th className="text-right">ລາຄາ (ກີບ)</th>
                </tr>
              </thead>
              <tbody>
                {filterPricing(electronicsAndDevices).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.item}</td>
                    <td className="price">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="furniture">
          <div className="overflow-x-auto">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="w-10">#</th>
                  <th>ລາຍການ</th>
                  <th className="text-right">ລາຄາ (ກີບ)</th>
                </tr>
              </thead>
              <tbody>
                {filterPricing(furnitureAndLarge).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.item}</td>
                    <td className="price">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="vehicles">
          <div className="overflow-x-auto">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="w-10">#</th>
                  <th>ລາຍການ</th>
                  <th className="text-right">ລາຄາ (ກີບ)</th>
                </tr>
              </thead>
              <tbody>
                {filterPricing(vehiclesAndParts).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.item}</td>
                    <td className="price">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="special">
          <div className="overflow-x-auto">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="w-10">#</th>
                  <th>ລາຍການ</th>
                  <th className="text-right">ລາຄາ (ກີບ)</th>
                </tr>
              </thead>
              <tbody>
                {filterPricing(specialPackages).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.item}</td>
                    <td className="price">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Notes */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">ໝາຍເຫດ</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>ລາຄາຂ້າງເທິງນີ້ແມ່ນລາຄາມາດຕະຖານ ສຳລັບການຈັດສົ່ງປົກກະຕິ.</li>
          <li>ອາດມີການປັບປ່ຽນລາຄາຕາມຂະໜາດແລະນໍ້າໜັກທີ່ແທ້ຈິງຂອງພັດສະດຸ.</li>
          <li>ລາຄາບໍລິການຈັດສົ່ງດ່ວນພິເສດກະລຸນາຕິດຕໍ່ໂດຍກົງ.</li>
          <li>ສຳລັບການຂົນສົ່ງສິນຄ້າຈຳນວນຫຼາຍ, ທ່ານສາມາດຕິດຕໍ່ເພື່ອຮັບໂປຣໂມຊັ່ນພິເສດ.</li>
          <li>ລາຄາທັງໝົດແມ່ນລວມອາກອນ VAT ແລ້ວ.</li>
        </ul>
      </div>

      {/* Calculator Button */}
      <div className="text-center mt-8">
        <Button className="bg-red-600 hover:bg-red-700">
          ໃຊ້ເຄື່ອງຄິດໄລ່ຄ່າຂົນສົ່ງ
        </Button>
      </div>
    </div>
  );
}
