import { Wallet } from "shared/components/Wallet/Wallet";
import { BuyCurrency } from "shared/components/BuyCurrency/BuyCurrency";
import { Preorder } from "shared/components/Preorder/Preorder";
import { PreorderStore } from "shared/components/PreorderStore/PreorderStore";
import { Telegram } from "shared/components/Telegram/Telegram";
import { Forecast } from "shared/components/Forecast/Forecast";

export const lexiconCuts = {
  bitcoin: "BTC",
  bitTorrent: "BTT",
  dogs: "DOGS",
  ethereum: "ETH",
  notcoin: "NOT",
  sui: "SUI",
  mantle: "MNT",
  hamster: "HMSTR",
  usdCoin: "USDC",
};

export const dictionary = {
  Wallet: "Кошелек",
  BuyCurrency: "Покупка",
  Preorder: "Предзаказ",
  PreorderStore: "История предзаказов",
  Telegram: "Телеграм",
  Forecast: "Прогноз ИИ",
};

export const personalTabs = {
  Wallet: Wallet, 
  BuyCurrency: BuyCurrency, 
  Preorder: Preorder, 
  PreorderStore: PreorderStore,
  Telegram: Telegram,
  Forecast: Forecast,
} as const;

export type TPersonalTabs = keyof typeof personalTabs;

export interface PersonalPageProps {
  tabProps: Record<TPersonalTabs, React.FC>;
};

export const WS_ALL_URL = "ws://localhost:8008/allCourses";
export const WS_ONE_URL = "ws://localhost:8009/oneCourse";