"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Package,
  DollarSign,
  Box,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLazyQuery } from "@apollo/client";
import Schema from "../../apollo/index";
import { currency } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@radix-ui/react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectProvinces from "@/components/ui/selectProvinces";

interface PricingItem {
  id: number;
  item: string;
  price: string;
}

export default function PricingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPrice, setItemsPrice] = useState<any[]>();
  const [totalPrice, setTotalPrice] = useState<any[]>();
  const [getWidth, setGetWidth] = useState("");
  const [getWeight, setGetWeight] = useState("");
  const [priceItem, setPriceItem] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<{
    value: string | undefined;
    name: string | null;
  }>({ value: undefined, name: null });


  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fetchData, { data }] = useLazyQuery(Schema.packagesPrice, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const query = searchParams.get("searchQuery") || "";
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    fetchData({
      variables: {
        where: {
          title: searchQuery ? searchQuery : undefined,
        },
        skip: skip,
        limit: limit,
      },
    });
  }, [skip, limit, fetchData, searchQuery]);

  useEffect(() => {
    if (data) {
      setItemsPrice(data?.ans_category?.data || []);
      setTotalPrice(data?.ans_category?.total || 0);
    }
  }, [data]);

  const loadMoreBranches = () => {
    setSkip(skip + limit);
    setLimit(limit + 10);
  };

  const filteredItemsPrice = itemsPrice?.filter((Price) =>
    Price.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateSearchQuery = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set("searchQuery", query);
    } else {
      newParams.delete("searchQuery");
    }
    window.history.pushState({}, "", `${pathname}?${newParams.toString()}`);
    setSearchQuery(query);
  };

  const calculator = ({
    width,
    weight,
    transferToProvince,
    checkFree,
  }: {
    width: number;
    weight: number;
    transferToProvince?: number;
    checkFree?: boolean;
  }) => {
    const priceOfCm = 200;
    const priceOfKg = 1900;
    const startPrice = 8000;
    let totalPrices = 0;

    if (checkFree) {
      return 0;
    }

    if (weight === 1 && width < 45) {
      totalPrices = startPrice;
    } else {
      const percent = width * priceOfCm + weight * priceOfKg;
      totalPrices = percent + (percent * 15) / 100;
    }

    if (transferToProvince === 1) {
      const percent = 40;
      totalPrices += totalPrices * (percent / 100);
    }

    return Math.floor(totalPrices / 1000) * 1000;
  };

  const calculatePrice = () => {
    if (!getWidth || !getWeight) {
      alert("ປ້ອນຂະໜາດນ້ຳໜັກກ່ອນ");
      return;
    }

    const width = parseInt(getWidth);
    const weight = parseInt(getWeight);

    if (width <= 0 || width > 350 || weight <= 0 || weight > 80) {
      alert("ຂະໜາດນ້ຳໜັກບໍ່ຖືກຕ້ອງ");
      return;
    }

    const calculatedPrice = calculator({
      width,
      weight,
      checkFree: false,
    });

    setPriceItem(calculatedPrice);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ລາຄາຄ່າບໍລິການ</h1>

      <div className="mb-8 bg-red-50 border border-red-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-red-600 flex items-center">
          <Package className="h-5 w-5 mr-2" />
          ບໍລິການເກັບເງິນປາຍທາງ (COD)
        </h2>
        <p className="text-gray-700 mb-3">
          ຄ່າບໍລິການເກັບເງິນປາຍທາງພຽງແຕ່ 1,000 ກີບ ຕໍ່ການສົ່ງແຕ່ລະຄັ້ງ,
          ໂອນເງິນພາຍໃນ 1-2 ວັນທຳການ
        </p>
        <Link href="https://app.anousith.express/login">
          <Button className="bg-red-600 hover:bg-red-700">
            ລົງທະບຽນໃຊ້ບໍລິການ
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="ຄົ້ນຫາລາຄາສິນຄ້າ..."
            className="w-full bg-gray-50 pr-10"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Pricing Tabs */}
      <Tabs defaultValue="standard" className="mb-8">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger
            value="standard"
            className="w-full text-center hover:text-red-600"
          >
            ພັດສະດຸພິເສດ
          </TabsTrigger>
          <TabsTrigger
            value="price"
            className="w-full text-center hover:text-red-600"
          >
            ຄິດໄລ່ຄ່າບໍລິການ(ພັດສະດຸທົ່ວໄປ)
          </TabsTrigger>
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
                {filteredItemsPrice?.map((value, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value?.title}</td>
                    <td className="price text-right">
                      {currency(value?.packagePrice)} ກີບ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-8">
              <p className="text-gray-500 mb-4">
                ສະແດງ {filteredItemsPrice?.length} ໃນ {totalPrice} ສາຂາ
              </p>
              <Button variant="outline" onClick={loadMoreBranches}>
                ໂຫຼດສາຂາເພີ່ມເຕີມ
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="price">
          <div className="bg-red-100 p-8 rounded-lg shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-red-700 mb-4 text-center">
              ຄິດໄລ່ຄ່າບໍລິການ
            </h2>

            <div className="flex justify-center mb-4">
              <Package className="h-16 w-16 text-red-600" />
            </div>

            <div className="flex items-center space-x-4 mb-4">
            <SelectProvinces
  all={true}
  value={selectedProvince.value}
  onChange={(selected) => {
    if (selected) {
      setSelectedProvince({ value: selected.value, name: selected.provinceName });
    } else {
      setSelectedProvince({ value: undefined, name: null });
    }
  }}
/>

              <div className="text-red-600">
                <ArrowRight className="h-6 w-6" />
              </div>

              {/* <Select>
                <SelectTrigger className="w-full border border-red-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                  ເລືອກປາຍທາງ
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hdy">1</SelectItem>
                  <SelectItem value="kkc">2</SelectItem>
                  <SelectItem value="urt">3</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="number"
                placeholder="ຂະໜາດສິນຄ້າ (cm)"
                className="p-3 border border-red-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                value={getWidth}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    !value ||
                    (parseInt(value) > 0 && parseInt(value) <= 350)
                  ) {
                    setGetWidth(value);
                  }
                }}
              />
              <input
                type="number"
                placeholder="ນ້ຳໜັກ (kg)"
                className="p-3 border border-red-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                value={getWeight}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    !value ||
                    (parseInt(value) > 0 && parseInt(value) <= 80)
                  ) {
                    setGetWeight(value);
                  }
                }}
              />
            </div>

            <button
              className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition"
              onClick={calculatePrice}
            >
              ຄຳນວນ
            </button>
            <p>ສາຂາທີ່ເລືອກ: {selectedProvince.name || "ຍັງບໍ່ໄດ້ເລືອກ"}</p>

            {priceItem !== null && (
              <div className="mt-6 text-center bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-700">ລາຄາ:</p>
                <div className="flex justify-center items-center text-2xl font-semibold text-red-600">
                  <Box className="h-6 w-6 mr-2" />{" "}
                  <span>{priceItem.toLocaleString()} ກີບ</span>
                </div>
              </div>
            )}
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
          <li>
            ສຳລັບການຂົນສົ່ງສິນຄ້າຈຳນວນຫຼາຍ,
            ທ່ານສາມາດຕິດຕໍ່ເພື່ອຮັບໂປຣໂມຊັ່ນພິເສດ.
          </li>
          <li>ລາຄາທັງໝົດແມ່ນລວມອາກອນ VAT ແລ້ວ.</li>
        </ul>
      </div>
    </div>
  );
}
