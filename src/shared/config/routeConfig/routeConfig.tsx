import { RouteProps } from "react-router-dom";

import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { GamePage } from "pages/GamePage";
import { MarketPage } from "pages/MarketPage";
import { PersonalPage } from "pages/Personal";
import { NotFoundPage } from "pages/NotFoundPage";

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  GAME = "game",
  MARKET = "market",
  PERSONAL = "personal",
  // NOT_FOUND = "notFound",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.GAME]: "/game",
  [AppRoutes.MARKET]: "/market",
  [AppRoutes.PERSONAL]: "/personal",
  // [AppRoutes.NOT_FOUND]: "*",
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

  [AppRoutes.GAME]: {
    path: RoutePath.game,
    element: <GamePage />,
  },

  [AppRoutes.MARKET]: {
    path: RoutePath.market,
    element: <MarketPage />,
  },

  [AppRoutes.PERSONAL]: {
    path: RoutePath.personal,
    element: <PersonalPage />,
  },
  // [AppRoutes.NOT_FOUND]: {
  //   path: RoutePath.notFound,
  //   element: <NotFoundPage />,
  // },
};
