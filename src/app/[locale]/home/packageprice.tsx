"use client";

import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Schema from "../../../apollo/index";
import { currency } from "@/lib/utils";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface PackageItem {
  title: string;
  packagePrice: number;
}

export default function PackagePrice() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [showAll, setShowAll] = useState<PackageItem[]>([]);
  const [fetchData, { data }] = useLazyQuery(Schema.packagesPrice, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    fetchData({
      variables: {
        where: {
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
              <th>{t("column_name")}</th>
              <th className="text-right">{t("column_price")}</th>
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
        <Link href={`/${locale}/pricing`}>
          <Button className="bg-red-600 hover:bg-red-700">
            {t("view_all")}
          </Button>
        </Link>
      </div>
    </>
  );
}
