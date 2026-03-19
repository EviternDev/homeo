import { Currency } from "@/types";
import { parseCurrencyCode } from "@/lib/guards";

export const currencies = [
  { code: "INR", symbol: "Rs.", name: "Indian Rupee", rate: 1 },
  { code: "USD", symbol: "$", name: "US Dollar", rate: 0.012 },
  { code: "EUR", symbol: "EUR", name: "Euro", rate: 0.011 },
  { code: "GBP", symbol: "GBP", name: "British Pound", rate: 0.0094 },
] satisfies Currency[];

export function findCurrencyByCode(code: unknown): Currency | undefined {
  const normalized = parseCurrencyCode(code);
  if (!normalized) {
    return undefined;
  }
  return currencies.find((entry) => entry.code === normalized);
}
