import { Wallet } from "shared/components/Wallet/Wallet";
import { BuyCurrency } from "shared/components/BuyCurrency/BuyCurrency";
import { Preorder } from "shared/components/Preorder/Preorder";
import { PreorderStore } from "shared/components/PreorderStore/PreorderStore";
import { Telegram } from "shared/components/Telegram/Telegram";
import { Forecast } from "shared/components/Forecast/Forecast";
import { AllGameOptions } from "shared/components/Admin/AdminGames/AllGameOptions";
import { AllGamesInfo } from "shared/components/Admin/AdminGames/AllGamesInfo";
import { UsersList } from "shared/components/Admin/AdminUsers/UsersList";
import { WalletsList } from "shared/components/Admin/AdminWallets/WalletsList";

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
  AllGamesInfo: "Все игры",
  AllGameOptions: "Oпции игры",
  UsersList: "Общее",
  WalletsList: "Общее",
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

export const AdminGamesTabs = {
  AllGamesInfo: AllGamesInfo, 
  AllGameOptions: AllGameOptions, 
} as const;

export type TAdminGamesTabs = keyof typeof AdminGamesTabs;

export interface AdminGamesPageProps {
  tabProps: Record<TAdminGamesTabs, React.FC>;
};

export const AdminUsersTabs = { 
  UsersList: UsersList,  
} as const;

export type TAdminUsersTabs = keyof typeof AdminUsersTabs;

export interface AdminUsersPageProps {
  tabProps: Record<TAdminUsersTabs, React.FC>;
};

export const AdminWalletsTabs = { 
  WalletsList: WalletsList,  
} as const;

export type TAdminWalletsTabs = keyof typeof AdminWalletsTabs;

export interface AdminWalletsPageProps {
  tabProps: Record<TAdminWalletsTabs, React.FC>;
};