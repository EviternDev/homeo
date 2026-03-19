"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { currencies } from "@/data/currencyRates";
import { Currency, CurrencyCode } from "@/types";

type CurrencyState = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convertPrice: (priceInInr: number) => number;
  formatPrice: (priceInInr: number) => string;
};

const FALLBACK_CURRENCY: CurrencyCode = "INR";

const currencyMap = currencies.reduce<Map<CurrencyCode, Currency>>((map, entry) => {
  map.set(entry.code, entry);
  return map;
}, new Map());

const formatterMap = currencies.reduce<Map<CurrencyCode, Intl.NumberFormat>>(
  (map, entry) => {
    map.set(
      entry.code,
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: entry.code,
        maximumFractionDigits: entry.code === FALLBACK_CURRENCY ? 0 : 2,
      })
    );
    return map;
  },
  new Map()
);

const sanitizeCurrency = (value: unknown): CurrencyCode => {
  if (typeof value === "string" && currencyMap.has(value as CurrencyCode)) {
    return value as CurrencyCode;
  }
  return FALLBACK_CURRENCY;
};

const getCurrencyMeta = (code: CurrencyCode) =>
  currencyMap.get(code) ?? currencyMap.get(FALLBACK_CURRENCY)!;

const getFormatter = (code: CurrencyCode) =>
  formatterMap.get(code) ?? formatterMap.get(FALLBACK_CURRENCY)!;

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: "INR",
      setCurrency: (currency) => set({ currency: sanitizeCurrency(currency) }),
      convertPrice: (priceInInr) => {
        const meta = getCurrencyMeta(sanitizeCurrency(get().currency));
        return priceInInr * meta.rate;
      },
      formatPrice: (priceInInr) => {
        const active = sanitizeCurrency(get().currency);
        const value = get().convertPrice(priceInInr);
        return getFormatter(active).format(value);
      },
    }),
    {
      name: "homeo-currency",
      partialize: (state) => ({ currency: state.currency }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        currency: sanitizeCurrency(
          (persistedState as Partial<CurrencyState> | undefined)?.currency
        ),
      }),
    }
  )
);
