import { lazy } from "react";

export const BuyPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-expect-error setTimeout no used is real projects
      setTimeout(() => resolve(import("./BuyPage")), 1500);
    })
);
