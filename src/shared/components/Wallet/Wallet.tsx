import { useEffect } from "react";
import { useDispatch } from "react-redux";

import style from ".//Wallet.module.scss";
import { useAppSelector } from "app/store/useAppSelector";
import { AppDispatch } from "app/store/store";
import { walletGet } from "api/axios/walletGet";

interface WalletState {
    [key: string]: number;
  }

  interface CoinIconsState {
    [key: string]: string;
  }

export const Wallet = () => {
    const dispatch: AppDispatch = useDispatch();
  const wallet: WalletState = useAppSelector((state) => state.wallet);
  const icons: CoinIconsState = useAppSelector((state) => state.coinIcons);
  const courses = useAppSelector((state) => state.courses);

  useEffect(() => {
    walletGet(dispatch);
  }, [courses]);

  return (
    <div className={style.wrapper}>
        <div className={style.container}>
            <div className={style.waletHeader}>
                Кошелек
            </div>
            <div className={style.walletContent}>
                <div className={style.usdState}>${Number(wallet.usd).toFixed(2)}</div>
                <div className={style.coinContainer}>
                    {Object.entries(wallet).map(([name, value]) => {
                        if(name === "id" || name === "created_at" || name === "usd" || value < 0.01) return
                        return (
                            <div className={style.card} id={name} key={name}>
                            <div className={style.img}>
                                <img src={icons[name as string]} alt={name as string} />
                            </div>
                            <div className={style.name}>{name}</div>
                            <div className={style.course}>{`${Number(value).toFixed(2)}`}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
  )
};