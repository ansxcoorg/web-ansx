import Flag from "react-world-flags";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";

import { useParams } from "next/navigation";

type Props = {
  defaultValue: string;
  label: string;
};

export default function LocalSelect({ defaultValue, label }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleChange = (value: string) => {
    router.replace(pathname, { locale: value as Locale });
  };

  const getCountryCode = (lang: string) => {
    switch (lang.toUpperCase()) {
      case "LA":
        return "LA";
      case "TH":
        return "TH";
      case "US":
        return "US";
      case "CN":
        return "CN";
      case "VN":
        return "VN";
      case "KR":
        return "KR";
      default:
        return lang.toUpperCase();
    }
  };
  

  return (
    <>
      <Select defaultValue={defaultValue} onValueChange={handleChange}>
        <SelectTrigger className="w-18 p-4">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {routing.locales.map((lang) => (
            <SelectItem key={lang} value={lang}>
              <div className="flex items-center">
                <span>{lang.toUpperCase()}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
