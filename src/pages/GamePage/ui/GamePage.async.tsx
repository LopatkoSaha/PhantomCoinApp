import { lazy } from "react";

export const GamePageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-expect-error setTimeout no used is real projects
      setTimeout(() => resolve(import("./GamePage")), 1500);
    })
);
