"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Map from "./Map";
import Schema from "../../apollo/index";
import { useLazyQuery } from "@apollo/client";
import { usePathname, useSearchParams } from "next/navigation";

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemBranches, setItemBranches] = useState<any[]>([]);
  const [totalBranches, setTotalBranches] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  // const [displayLimit, setDisplayLimit] = useState(50);

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
        },
        skip: skip,
        limit: limit,
      },
    });
  }, [skip, limit, searchQuery, QueryBranch]);

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
      <h1 className="text-3xl font-bold mb-6">ສາຂາທັງໝົດ</h1>

      {/* Branch Map (Placeholder) */}
      <Map branches={filteredBranches} center={mapCenter} zoom={mapZoom} />

      <Separator className="my-8" />

      {/* Search Box */}
      <div className="mb-8 max-w-lg">
        <div className="relative">
          <Input
            type="search"
            placeholder="ຄົ້ນຫາສາຂາ..."
            className="w-full bg-gray-50 pr-10"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Branches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBranches.length > 0 ? (
          filteredBranches.map((branch, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <Image
                      src="https://ext.same-assets.com/4210099945/4268394336.png"
                      alt="Branch icon"
                      width={28}
                      height={28}
                    />
                  </div>
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
                        className="mr-2 text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <span className="mr-1">☎</span> {branch.branch_address}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleViewMap(branch?.map_lat, branch?.map_lng)
                        }
                      >
                        ເບິ່ງແຜນທີ່
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">ບໍ່ພົບສາຂາທີ່ຄົ້ນຫາ</p>
          </div>
        )}
      </div>

      {/* More Branches Indicator */}
      <div className="text-center mt-8">
        <p className="text-gray-500 mb-4">
          ສະແດງ {filteredBranches.length} ໃນ {totalBranches} ສາຂາ
        </p>
        <Button variant="outline" onClick={loadMoreBranches}>
          ໂຫຼດສາຂາເພີ່ມເຕີມ
        </Button>
      </div>
    </div>
  );
}
