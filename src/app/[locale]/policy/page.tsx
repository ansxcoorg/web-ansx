"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
const SectionHeader = ({ title }: { title: string }) => (
  <h4 className="text-lg font-bold mt-6 mb-2">{title}</h4>
);

const PolicyItem = ({
  text,
  highlight,
}: {
  text: string;
  highlight?: boolean;
}) => (
  <tr>
    <td className={`py-2 ${highlight ? "text-green-600 font-bold" : ""}`}>
      {text}
    </td>
  </tr>
);

const PolicySection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <>
    <tr>
      <td colSpan={2}>
        <SectionHeader title={title} />
      </td>
    </tr>
    {items.map((item, index) => (
      <PolicyItem key={index} text={item} />
    ))}
  </>
);

export default function Policy() {
  const t = useTranslations("Policy");
  const sections = [
    {
      title: t("things_to_know"),
      items: [t("0"), t("1"), t("2"), t("3"), t("4")],
      highlightIndex: 3,
    },
    {
      title: t("Packaging of Products"),
      items: [t("5"), t("6")],
    },
    {
      title: t("Definitions"),
      items: [
        t("8"), t("9"), t("10"), t("11"), t("12"),
        t("13"), t("14"), t("15"), t("16"), t("17"), t("17_1"), t("17_2"),
      ],
    },
    {
      title: t("Prohibited Items"),
      items: [
        t("18"), t("19"), t("20"), t("21"), t("22"), t("23"), t("24"), t("25"),
        t("26"), t("27"), t("28"), t("29"), t("30"), t("31"), t("32"), t("33"),
        t("34"), t("35"), t("36"), t("37"), t("38"), t("39"), t("40"),
      ],
    },
    {
      title: t("Liability Limitations"),
      items: [t("41"), t("42"), t("43"), t("44"), t("45"), t("46"), t("47"), t("48")],
    },
    {
      title: t("Sender Indemnity"),
      items: [
        t("49"), t("50"), t("51"), t("52"), t("53"), t("54"), t("55"), t("56"),
        t("57"), t("58"), t("59"), t("60"), t("61"), t("62"), t("63"),
      ],
    },
    {
      title: t("Delivery"),
      items: [t("64"), t("65"), t("66"), t("67")],
    },
    {
      title: t("Proof of Delivery"),
      items: [t("68"), t("69"), t("70")],
    },
    {
      title: t("Failed Delivery"),
      items: [t("71"), t("72"), t("73"), t("74"), t("75"), t("76"), t("77")],
    },
    {
      title: t("Delay"),
      items: [t("78"), t("79")],
    },
    {
      title: t("Undelivered and Returns"),
      items: [
        t("80"), t("81"), t("82"), t("83"), t("84"), t("85"), t("86"), t("87"), t("88"), t("89"),
      ],
    },
    {
      title: t("Fees"),
      items: [t("90"), t("91")],
    },
    {
      title: t("COD"),
      items: [t("92"), t("93"), t("94")],
    },
    {
      title: t("Rerouting"),
      items: [t("95"), t("96"), t("97")],
    },
    {
      title: t("Inspection Rights"),
      items: [t("98"), t("99")],
    },
    {
      title: t("Our Liability"),
      items: [t("100"), t("101"), t("102"), t("103"), t("104"), t("105"), t("106"), t("107"), t("108")],
    },
    {
      title: t("Force Majeure"),
      items: [t("109"), t("110"), t("111"), t("112")],
    },
    {
      title: t("Governing Law"),
      items: [t("113")],
    },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6">{t("title")}</h1>
      <div className="mb-8 bg-gray-100 rounded-lg p-4">
        <h2 className="text-lg text-center font-semibold mb-4">
          {" "}
          <b>{t("title2")}</b>
          <br />
          {t("description")}
        </h2>

        <div  className="overflow-x-auto">
          <table className="policy-table">
            <tbody>
              {sections.map((section, index) => (
                <PolicySection
                  key={index}
                  title={section.title}
                  items={section.items}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
