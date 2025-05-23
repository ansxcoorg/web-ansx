"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Package,
  Box,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLazyQuery } from "@apollo/client";
import Schema from "@apollo/index";
import { currency } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectProvinces from "@/components/ui/selectProvinces";
import { useLocale, useTranslations } from "next-intl";

interface PricingItem {
  id: number;
  item: string;
  price: string;
  title: string;
  packagePrice: number;
}

export default function PricingPage() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPrice, setItemsPrice] = useState<PricingItem[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [getWidth, setGetWidth] = useState("");
  const [getWeight, setGetWeight] = useState("");
  const [priceItem, setPriceItem] = useState<number | null>(null);
  const [selectedProvinceFrom, setSelectedProvinceFrom] = useState<{
    value: number | undefined;
    name: string | null;
  }>({ value: undefined, name: null });

  const [selectedProvinceTo, setSelectedProvinceTo] = useState<{
    value: number | undefined;
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
    if (!getWidth || !getWeight || selectedProvinceFrom || selectedProvinceTo) {
      setPriceItem(null);
    }
  }, [getWidth, getWeight, selectedProvinceFrom, selectedProvinceTo]);

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
    transferToProvince = 0,
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
    if (
      !getWidth ||
      !getWeight ||
      !selectedProvinceFrom?.value ||
      !selectedProvinceTo?.value
    ) {
      toast.error(t("select_province_and_enter_weight"), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        className: "custom-toast",
      });
      return;
    }

    const width = parseInt(getWidth);
    const weight = parseInt(getWeight);

    if (width < 40 || width > 350 || weight < 1 || weight > 80) {
      toast.error(t("invalid_size_or_weight"), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        className: "custom-toast",
      });
      return;
    }

    const transferToProvince = stateToSouthernEarth(
      selectedProvinceFrom.value,
      selectedProvinceTo.value
    );

    const calculatedPrice = calculator({
      width,
      weight,
      transferToProvince,
      checkFree: false,
    });

    setPriceItem(calculatedPrice);
  };

  const stateToSouthernEarth = (
    from_state: number,
    end_state: number
  ): number => {
    const fromState = Number(from_state);
    const endState = Number(end_state);

    if (isNaN(fromState) || isNaN(endState)) {
      return 0;
    }
    const northern = [18, 13, 19, 16, 14, 17, 22, 21, 15, 23];
    const southern = [8, 9, 3, 10, 5, 11, 12];

    if (
      (southern.indexOf(fromState) !== -1 &&
        northern.indexOf(endState) !== -1) ||
      (southern.indexOf(endState) !== -1 && northern.indexOf(fromState) !== -1)
    ) {
      return 1;
    }
    return 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("service_price")}</h1>

      <div className="mb-8 bg-red-50 border border-red-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-red-600 flex items-center">
          <Package className="h-5 w-5 mr-2" />
          {t("cod_service")}
        </h2>
        <p className="text-gray-700 mb-3">{t("cod_description")}</p>
        <Link href="https://app.anousith.express/login">
          <Button className="bg-red-600 hover:bg-red-700">
            {t("register_service")}
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder={t("search_price")}
            className="w-full bg-gray-50 pr-10"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <Tabs defaultValue="standard" className="mb-8">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger
            value="standard"
            className="w-full text-center hover:text-red-600"
          >
            {t("express_delivery")}
          </TabsTrigger>
          <TabsTrigger
            value="price"
            className="w-full text-center hover:text-red-600"
          >
            {t("general_delivery")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="standard">
          <div className="overflow-x-auto">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="w-10">#</th>
                  <th>{t("column_name")}</th>
                  <th className="text-right">{t("column_price")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredItemsPrice?.map((value, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value?.title}</td>
                    <td className="price text-right">
                      {currency(value?.packagePrice)} {t("currency")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-8">
              <p className="text-gray-500 mb-4">
                {t("display")} {filteredItemsPrice?.length}{" "}
                {t("in")} {totalPrice} {t("column_name")}
              </p>
              <Button variant="outline" onClick={loadMoreBranches}>
                {t("load_more_branches")}
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="price">
          <div className="bg-red-100 p-8 rounded-lg shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-red-700 mb-4 text-center">
              {t("calculate_service_fee")}
            </h2>

            <div className="flex justify-center mb-4">
              <Package className="h-16 w-16 text-red-600" />
            </div>

            <div className="flex justify-center space-x-4 mb-4">
              <div className="flex flex-col items-center">
                <h2 className="mb-4">{t("select_province_from")}</h2>
                <SelectProvinces
                  all={true}
                  value={
                    selectedProvinceFrom.value ||
                    t("select_province_placeholder")
                  }
                  onChange={(selected) => {
                    if (selected) {
                      setSelectedProvinceFrom({
                        value: selected.value,
                        name: selected.provinceName,
                      });
                    } else {
                      setSelectedProvinceFrom({ value: undefined, name: null });
                    }
                  }}
                />
              </div>

              <div className="flex flex-col items-center text-red-600">
                <ArrowRight className="h-6 w-6 mb-8" />
              </div>

              <div className="flex flex-col items-center">
                <h2 className="mb-4">{t("select_province_to")}</h2>
                <SelectProvinces
                  all={true}
                  value={
                    selectedProvinceTo.value || t("select_province_placeholder")
                  }
                  onChange={(selected) => {
                    if (selected) {
                      setSelectedProvinceTo({
                        value: selected.value,
                        name: selected.provinceName,
                      });
                    } else {
                      setSelectedProvinceTo({ value: undefined, name: null });
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="number"
                placeholder={t("package_size_placeholder")}
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
                placeholder={t("weight_placeholder")}
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
              {t("calculate")}
            </button>

            {priceItem !== null && (
              <>
                <div className="mt-6 text-center bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-center items-center mb-2">
                    <p className="text-gray-700 mr-2 font-bold text-lg">
                      {t("shipping_fee")}:
                    </p>
                    <div className="flex justify-center items-center text-2xl font-semibold text-red-600">
                      <Box className="h-6 w-6 mr-2" />{" "}
                      <span>
                        {priceItem.toLocaleString()} {t("currency")}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="text-center mt-2">
                    {" "}
                    <Link href={`/${locale}/branches`}>
                      <Button className="bg-red-600 hover:bg-red-700">
                        {t("search_nearest_branch")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">{t("note")}</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>{t("notes.standard_price")}</li>
          <li>{t("notes.price_adjustment")}</li>
          <li>{t("notes.express_shipping")}</li>
          <li>{t("notes.bulk_shipping")}</li>
          <li>{t("notes.vat_included")}</li>
        </ul>
      </div>
    </div>
  );
}
