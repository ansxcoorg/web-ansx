"use client";

import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState, useRef } from "react";
import Schema from "../../../apollo/index";
import { currency } from "@/lib/utils";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";

export default function PackagePrice() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [showAll, setShowAll] = useState<any[]>();
  const [fetchData, { data }] = useLazyQuery(Schema.packagesPrice, {
    fetchPolicy: "cache-and-network",
  });
  {/* Effect Table scrollRef */}
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    fetchData({ variables: { where: {} } });
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      setShowAll(data?.ans_category?.data || []);
    }
  }, [data]);

  return (
    <>
      <div className="overflow-x-auto rounded-md">
        <table className="pricing-table">
          <thead className="sticky top-0">
            <tr>
              <th className="w-10">#</th>
              <th>{t("column_name")}</th>
              <th className="text-right">{t("column_price")}</th>
            </tr>
          </thead>
        </table>

        {/* Progress bar */}
        <motion.div style={{ scaleX }} className="h-1 bg-red-500 origin-left mb-1" />

        <div ref={scrollRef} className="overflow-y-auto max-h-96">
          <table className="pricing-table">
            <tbody>
              {showAll?.map((item, index) => (
                <tr
                  className="bg-white hover:bg-red-50 hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer rounded-md"
                  key={index}
                >
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
      </div>

      <div className="text-center mt-8">
        <Link href={`/${locale}/pricing`}>
          <Button className="bg-red-600 hover:bg-red-700">{t("view_all")}</Button>
        </Link>
      </div>
    </>
  );
}