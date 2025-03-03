import { Wallet } from "shared/components/Wallet/Wallet";
import { BuyCurrency } from "shared/components/BuyCurrency/BuyCurrency";
import { Preorder } from "shared/components/Preorder/Preorder";
import { PreorderStore } from "shared/components/PreorderStore/PreorderStore";
import { Telegram } from "shared/components/Telegram/Telegram";

export const intervalChenged = 3000;
export const coursesUpdateInterval = 10000;

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
};

export const personalTabs = {
  Wallet: Wallet, 
  BuyCurrency: BuyCurrency, 
  Preorder: Preorder, 
  PreorderStore: PreorderStore,
  Telegram: Telegram,
} as const;

export type TPersonalTabs = keyof typeof personalTabs;

export interface PersonalPageProps {
  tabProps: Record<TPersonalTabs, React.FC>;
};