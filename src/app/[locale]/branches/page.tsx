"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Map from "./Map";
import Schema from "../../../apollo/index";
import { useLazyQuery } from "@apollo/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Icon_gif from "./img/Location_branch.gif";

interface itemBranches {
  id_branch: number;
  branch_name: string;
  public: number;
  address_info: string;
  map_lat: string;
  map_lng: string;
  region: string;
  mainBranches: number;
  isDeleted: number;
  branch_address: string;
}

export default function BranchesPage() {
  const t = useTranslations("branch");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemBranches, setItemBranches] = useState<itemBranches[]>([]);
  const [totalBranches, setTotalBranches] = useState<number>(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  // const [displayLimit, setDisplayLimit] = useState(50);
  const [selectedRegion, setSelectedRegion] = useState("");

  const [mapCenter, setMapCenter] = useState({ lat: 17.9757, lng: 102.6331 });
  const [mapZoom, setMapZoom] = useState(7);

  const [QueryBranch, { data, loading }] = useLazyQuery(Schema.branches);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("searchQuery") || "";
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    QueryBranch({
      variables: {
        where: {
          branch_name: searchQuery ? searchQuery : undefined,
          region: selectedRegion ? selectedRegion : undefined,
        },
        skip: skip,
        limit: limit,
      },
    });
  }, [skip, limit, searchQuery, QueryBranch, selectedRegion]);

  useEffect(() => {
    if (data) {
      setItemBranches(data?.branches?.data || []);
      setTotalBranches(data?.branches?.total || 0);
    }
  }, [data]);

  const filteredBranches = itemBranches.filter((branch) =>
    branch.branch_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMoreBranches = () => {
    setSkip(skip + limit);
    setLimit(limit + 10);
  };

  // const loadMoreBranches = () => {
  //   setDisplayLimit((prevLimit) => prevLimit + 50);
  // };

  const updateSearchQuery = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set("searchQuery", query);
      // setMapZoom(10);
    } else {
      newParams.delete("searchQuery");
      setMapZoom(7);
      setMapCenter({ lat: 17.9757, lng: 102.6331 });
    }
    window.history.pushState({}, "", `${pathname}?${newParams.toString()}`);
    setSearchQuery(query);
  };

  const handleViewMap = (lat: string, lng: string) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      setMapCenter({ lat: latitude, lng: longitude });
      setMapZoom(15);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("all_branches")}</h1>

      <Map branches={filteredBranches} center={mapCenter} zoom={mapZoom} />

      <Separator className="my-8" />

      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedRegion("CENTRAL")}
            className={`py-3 px-8  rounded-md ${
              selectedRegion === "CENTRAL"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t("central_region")}
          </button>
          <button
            onClick={() => setSelectedRegion("NORTHERN")}
            className={`py-3 px-8  rounded-md ${
              selectedRegion === "NORTHERN"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t("northern_region")}
          </button>
          <button
            onClick={() => setSelectedRegion("SOUTHERN")}
            className={`py-3 px-8 rounded-md ${
              selectedRegion === "SOUTHERN"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t("southern_region")}
          </button>
        </div>

        <div className="ml-auto max-w-xl">
          <div className="relative">
            <Input
              type="search"
              placeholder={t("search_branch")}
              className="w-full bg-gray-50 pr-10"
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 inset-y-0 my-auto h-5 w-5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBranches.length > 0 ? (
          filteredBranches.map((branch, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300 
                ${branch.public === 1 ? "border-green-600" : "border-red-600"}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  {/* <div className="h-13 w-13 rounded-full bg-gray-50 flex items-center justify-center mr-4 flex-shrink-0"> */}
                  <img
                    src={Icon_gif.src}
                    alt="Branch icon"
                    width={40}
                    height={40}
                    className="object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  {/*      </div> */}
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {branch.branch_name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {branch.address_info}
                    </p>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`mr-2 ${
                          branch.public === 1
                            ? "text-green-600 border-green-600 hover:bg-green-50"
                            : "text-red-600 border-red-600 hover:bg-red-50"
                        }`}
                      >
                        <span className="mr-1">
                          {branch.public === 1 ? "✅" : "❌"}
                        </span>
                        {branch.public === 1
                          ? t("branch_open")
                          : t("branch_closed")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleViewMap(branch?.map_lat, branch?.map_lng)
                        }
                      >
                        {t("view_map")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">{t("no_branches_found")}</p>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 mb-4">
          {t("display")} {filteredBranches.length} {t("in")} {totalBranches}{" "}
          {t("branches")}
        </p>
        <Button variant="outline" onClick={loadMoreBranches}>
          {t("load_more")}
        </Button>
      </div>
    </div>
  );
}
