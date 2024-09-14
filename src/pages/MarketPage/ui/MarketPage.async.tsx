import { lazy } from "react";

export const MarketPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-expect-error setTimeout no used is real projects
      setTimeout(() => resolve(import("./MarketPage")), 1500);
    })
);
