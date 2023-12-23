import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | null | undefined): string => {
  if (date !== null && date !== undefined) {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour12: true,
    };
    return new Date(date).toLocaleString(undefined, options);
  } else {
    return "no data";
  }
};
