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
  onChange?: (res: any) => void;
  disabled?: boolean;
  value?: string;
  all?: boolean;
}) {
  const [items, setItems] = useState<any[]>([]);
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
      const results: provinces[] = data?.provinces?.data || [];
      const formattedResults = results.map(
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
    <div style={{ minWidth: 200, color: "black", marginTop: -5 }}>
      <Select
        disabled={disabled}
        onValueChange={(value) => {
          const selected = items.find((item) => item.value === value);
          if (onChange) onChange(selected || null);
        }}
        value={value}
      >
        <SelectTrigger className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm">
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
          position="item-aligned"
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
