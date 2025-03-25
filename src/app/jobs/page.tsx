"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLazyQuery } from "@apollo/client";
import { Calendar, User, UserPlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Schema from "../../apollo/index";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function Jobs() {
  const [itemsJobs, setItemsJobs] = useState<any[]>([]);
  const [fetchData, { data }] = useLazyQuery(Schema.communities, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    fetchData({
      variables: {
        where: {
          isPublic: 1,
          isVideo: 0,
          catalog: 16,
        },
      },
    });
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setItemsJobs(data?.communities?.data || []);
    }
  }, [data]);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ປະກາດຮັບສະໝັກ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {itemsJobs?.map((value, index) => (
          <Card
            key={index}
            className="flex flex-col h-full overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-[700px] w-full">
              <Image
                src={`https://storage.googleapis.com/ansx/website/images/${value?.image}`}
                alt={"photo"}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <CardContent className="flex flex-col flex-grow p-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(value?.createdAt)}</span>
                <span className="mx-1">•</span>
                <User className="h-3 w-3 mr-1" />
                <span>{value.catalog.title}</span>
              </div>

              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <div className="mt-auto">
                <Link
                  href={`https://job.anousith.express/index`}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                >
                  <UserPlus className="h-5 w-5 mr-2 text-white" />
                  ສະໝັກຕອນນີ້
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
