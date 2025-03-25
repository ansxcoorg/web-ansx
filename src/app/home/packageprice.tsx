"use client";

import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Schema from "../../apollo/index";
import { currency } from "@/lib/utils";
import Link from "next/link";

export default function PackagePrice() {
  const [showAll, setShowAll] = useState<any[]>();
  const [fetchData, { data }] = useLazyQuery(Schema.packagesPrice, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    fetchData({
      variables: {
        where: {
          isExtra: { ne: 0 },
        },
      },
    });
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setShowAll(data?.ans_category?.data || []);
    }
  }, [data]);
  return (
    <>
      <div className="overflow-x-auto max-h-96">
        <table className="pricing-table">
          <thead>
            <tr>
              <th className="w-10">#</th>
              <th>ລາຍການ</th>
              <th className="text-right">ລາຄາ (ກີບ)</th>
            </tr>
          </thead>
          <tbody>
            {showAll?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td className="price text-right">
                  {currency(item.packagePrice)} ກີບ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-8">
        <Link href="/pricing">
          <Button className="bg-red-600 hover:bg-red-700">
            ເບິ່ງລາຄາບໍລິການທັງໝົດ
          </Button>
        </Link>
      </div>
    </>
  );
}
