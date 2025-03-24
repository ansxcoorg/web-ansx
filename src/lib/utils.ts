import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (date: Date, format?: string) => {
  return moment(date ? date : new Date()).format(format ? format : "YYYY-MM-DD HH:mm:ss");
};

export const currency = (number: number = 0) => {
  if (!number) return "0";
  const currency = new Intl.NumberFormat("en-CA").format(number);
  return currency;
};
