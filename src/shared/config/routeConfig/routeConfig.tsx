import { RouteProps } from "react-router-dom";

import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { BuyPage } from "pages/BuyPage";
import { MarketPage } from "pages/MarketPage";
import { NotFoundPage } from "pages/NotFoundPage";

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  BUY = "buy",
  MARKET = "market",
  NOT_FOUND = "notFound",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.BUY]: "/buy",
  [AppRoutes.MARKET]: "/market",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },

  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },

  [AppRoutes.BUY]: {
    path: RoutePath.buy,
    element: <BuyPage />,
  },

  [AppRoutes.MARKET]: {
    path: RoutePath.market,
    element: <MarketPage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.notFound,
    element: <NotFoundPage />,
  },
};
