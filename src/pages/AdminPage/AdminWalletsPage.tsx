import React, { useState } from "react";

import style from "./AdminPage.module.scss";
import { RootState } from "app/store/store";
import { useAppSelector } from "app/store/useAppSelector";
import { AdminWalletsPageProps, TAdminWalletsTabs, dictionary } from "shared/config/config";

export const AdminWalletsPage: React.FC<AdminWalletsPageProps> = ({tabProps}) => {

  const user = useAppSelector((state: RootState) => state.user);
  const isUser = Boolean(user?.name);

  const [activeTab, setActiveTab] = useState<TAdminWalletsTabs>(Object.keys(tabProps)[0] as TAdminWalletsTabs);

  if (!tabProps || Object.keys(tabProps).length === 0) {
    return <div>Загрузка...</div>; 
  }

  return (
    <>
      {isUser &&
        <div className={style.wrapperPersonal}>
          <div className={style.headerPersonal}>{dictionary[activeTab]}</div>
          <div className={style.tabmenu}>
            {Object.keys(tabProps).map((name) => {
              const tabName = name as TAdminWalletsTabs;
              return (
                <button  className={tabName === activeTab ? style.btnActive : ""} key={tabName} onClick={() => setActiveTab(tabName)}>{dictionary[tabName]}</button>
              )
            })}
          </div>
          <div className={style.containerPersonal}>
            {React.createElement(tabProps[activeTab])} 
          </div>
        </div>
      }
    </>
  )
};