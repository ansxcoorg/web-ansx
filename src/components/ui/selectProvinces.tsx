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
} from "@radix-ui/react-select";

// สร้าง interface สำหรับ items ใน Select
interface ProvinceOption {
  value: string;
  label: string;
  provinceName?: string;
}

// สร้าง interface สำหรับ data ที่ fetch มา
interface provinces {
  id_state: string;
  provinceName: string;
}

export default function SelectProvinces({
  onChange,
  disabled,
  value,
  all,
}: {
  onChange?: (res: ProvinceOption | null) => void;
  disabled?: boolean;
  value?: string;
  all?: boolean;
}) {
  const [items, setItems] = useState<ProvinceOption[]>([]); // เปลี่ยนเป็น ProvinceOption[]
  
  // เรียกใช้ useLazyQuery จาก Apollo
  const [fetchData, { data, loading }] = useLazyQuery(Schema.provinces, {
    fetchPolicy: "network-only",
  });

  // Fetch ข้อมูลเมื่อ Component mount
  useEffect(() => {
    fetchData({
      variables: {
        where: {},
      },
    });
  }, [fetchData]);

  // เมื่อ data เปลี่ยนแปลง
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
    <div className="flex justify-center space-x-4 mb-4">
      <Select
        disabled={disabled}
        onValueChange={(value) => {
          // ค้นหาตัวเลือกที่เลือกมาใน items
          const selected = items.find((item) => item.value === value);
          if (onChange) onChange(selected || null); // ส่งค่าไปที่ onChange
        }}
        value={value}
      >
        <SelectTrigger className="w-full min-w-[150px] max-w-[250px] border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm">
          <SelectValue>
            {value && items.some((item) => item.value === value)
              ? items.find((item) => item.value === value)?.label
              : loading
              ? "ກຳລັງໂຫຼດ..."
              : "ເລືອກແຂວງ"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className="bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          position="popper"
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
      </Select>
    </div>
  );
}
