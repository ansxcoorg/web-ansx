import Flag from "react-world-flags";

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
    switch (lang) {
      case "Lao":
        return "LA";
      case "Thai":
        return "TH";
      case "Us":
        return "US";
      case "China":
        return "CN";
      case "VietNam":
        return "VN";
      case "Korea":
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
                <Flag
                  code={getCountryCode(lang)}
                  style={{ width: 24, height: 16, marginRight: 8 }}
                />
                <span>{lang.toUpperCase()}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
