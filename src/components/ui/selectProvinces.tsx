"use client";

import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import Schema from "../../apollo/index";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectPortal,
} from "@radix-ui/react-select";

// สร้าง interface สำหรับ items ใน Select
interface ProvinceOption {
  value: string;
  label: string;
  provinceName?: string;
}

interface provinces {
  id_state: string;
  provinceName: string;
}

interface SelectItem {
  value: string;
  label: string;
  provinceName?: string;
}

export default function SelectProvinces({
  onChange,
  disabled,
  value,
  all,
}: {
  onChange?: (res: SelectItem | null) => void;
  disabled?: boolean;
  value?: string | number;
  all?: boolean;
}) {
  const [items, setItems] = useState<SelectItem[]>([]);
  const [fetchData, { data, loading }] = useLazyQuery(Schema.provinces, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    fetchData({
      variables: {
        where: {},
      },
    });
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      const results = Array.isArray(data?.provinces?.data)
        ? (data.provinces.data as provinces[])
        : [];

      const formattedResults: ProvinceOption[] = results.map(
        (item: provinces, index: number) => ({
          value: item.id_state,
          label: `${index + 1}. ${item.provinceName}`,
          provinceName: item.provinceName,
        })
      );

      setItems(
        all
          ? [{ value: "all", label: "ທັງໝົດ" }, ...formattedResults]
          : formattedResults
      );
    } else {
      setItems([]);
    }
  }, [data, all]);

  return (
    <div className="w-full" data-aos-skip>
      <Select
        disabled={disabled}
        onValueChange={(val) => {
          const selected = items.find((it) => it.value === val);
          onChange?.(selected || null);
        }}
        value={value?.toString()}
      >

        <SelectTrigger
          className="w-full h-12 border border-gray-300 px-3 rounded-lg bg-white shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-red-500"
          // เผื่อ AOS ใช้ closest กับ trigger
          data-radix-select-trigger
        >
          <SelectValue>
            {value && items.some((it) => it.value === value)
              ? items.find((it) => it.value === value)?.label
              : loading
              ? "ກຳລັງໂຫຼດ..."
              : "ເລືອກແຂວງ"}
          </SelectValue>
        </SelectTrigger>

    <SelectPortal>
    <SelectContent
      className="bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto
                 z-[10000]"
      style={{ width: "var(--radix-select-trigger-width)" }}
      position="popper"
      sideOffset={8}
      data-aos-skip
    >
      {items.map((item) => (
        <SelectItem
          key={item.value}
          value={item.value}
          className="p-2 hover:bg-red-100 cursor-pointer"
        >
          {item.label}
        </SelectItem>
     ))}
    </SelectContent>
  </SelectPortal>
      </Select>
    </div>
  );
}
