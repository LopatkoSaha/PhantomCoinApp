import { useState, useEffect, useMemo } from "react";

import { TableCommon } from "../TableCommonLine/TableCommon";
import { LineWallet } from "../TableCommonLine/LineWallet";
import { allWallesInfotGet } from "api/axios/walletGet";
import { updataWalletPost } from "api/axios/adminRestApi/wallets";
import { FormWallet } from "./FormWallet";
import { useAppSelector } from "app/store/useAppSelector";
  
type TWallet = {
    id: number;
    name: string;
    email: string;
    created_at: string;
  } & Record<string, number>;
  
  type TMappedWallet = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    totalCostUsd: number;
  };

const matcher = {
  id: {
    title: "Id",
    isSort: true,
  },
  name: {
    title: "Имя пользователя",
    isSort: true,
  },
  email: {
    title: "Почта",
    isSort: true,
  },
  created_at: {
    title: "Дата",
    isSort: true,
  },
  totalCostUsd: {
    title: "Общая стоимость",
    isSort: true,
  },
}
  
export function WalletsList() {

  const [wallets, setWallets] = useState<TWallet[] | null>(null);
  const [activeWalletId, setActiveWalletId] = useState<number | null>(null);

  const fetchWallets = async () => {
    try {
      const data = await allWallesInfotGet();
      setWallets(data);
    } catch (error) {
      console.error("Ошибка при получении информации о кошельках:", error);
    }
  };
      
  useEffect(() => { 
    fetchWallets();
  },[]);

    const courses: Record<string, number> = useAppSelector((state) => {
        if(Object.keys(state.courses.currentCourses).length === 0) return state.courses.startCourses;
        return state.courses.currentCourses;
    });

    function calcTotalCostUsd (wallet: TWallet, courses: Record<string, number>) {
        const notCoinFields = ["id", "userId", "name", "email", "created_at"];
        return Object.entries(wallet).reduce((totalCostUsd, [key, value]) => {
            if(!notCoinFields.includes(key)) {
            if(key === "usd") return totalCostUsd + +value;
            return totalCostUsd + +value * +courses[key];
            }
            return totalCostUsd;
        }, 0);
    };

    const mappedWallets = useMemo(() => {
        if(!wallets) return [];
        return wallets.map((item) => {
            return {
            id: item.id,
            name: item.name,
            email: item.email,
            created_at: item.created_at,
            totalCostUsd: calcTotalCostUsd(item, courses),
            }
        });
    },[courses, wallets]);

    function closeModalHandler(){
        setActiveWalletId(null);
    };

    async function showModalHandler (walletId: number){
        setActiveWalletId(walletId);
    };

    async function updataHandler (data: Record<string, any>){
        activeWalletId && await updataWalletPost(activeWalletId, data);
        await fetchWallets();
    };

  function renderLine (dataItem: TMappedWallet) {
    return <LineWallet itemData={dataItem} showModalHandler={showModalHandler} />;
  };

  const activeWalletIdx = wallets?.findIndex((item) => item.id === activeWalletId);

  return (
    <>
        <TableCommon data={mappedWallets} matcher={matcher} renderLine={renderLine} />
        {activeWalletId && wallets &&
            <FormWallet 
                props={activeWalletIdx || activeWalletIdx === 0 ? wallets[activeWalletIdx] : null}
                closeHandler={closeModalHandler} 
                updataHandler={updataHandler}
            />
        }
    </>
  )
};
