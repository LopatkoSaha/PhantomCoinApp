import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./BuyCurrency.module.scss";
import { useAppSelector } from "app/store/useAppSelector";
import { AppDispatch } from "app/store/store";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { buyCurrencyPost } from "api/axios/buyCurrencyPost";
import { buyAllInPost } from "api/axios/buyAllInPost";
import { walletGet } from "api/axios/walletGet";
import { showModal } from "app/store/slices/modalSlice";

interface WalletState {
    [key: string]: number;
  }

  interface CoinIconsState {
    [key: string]: string;
  }

export const BuyCurrency = () => {
  const dispatch: AppDispatch = useDispatch();
  const wallet: WalletState = useAppSelector((state) => state.wallet);
  const user = useAppSelector((state) => state.user);
  const icons: CoinIconsState = useAppSelector((state) => state.coinIcons);

  const currencyNames = Object.keys(wallet).filter(
      (name) => name !== "id" && name !== "created_at"
    );

  const [saleName, setSaleName] = useState('usd');
  const [buyName, setBuyName] = useState('usd');
  const [quantity, setQuantity] = useState('');

    const handleSaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSaleName(event.target.value)
    };
    const handleBuyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuyName(event.target.value)
    };
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value)
    };

    const isValidFormBuy = [saleName, buyName, quantity].some((item) => item === '' || saleName === buyName);
    const isValidFormBuyAllIn = [saleName, buyName].some((item) => item === '' || saleName === buyName);

    const cancelHandler = () => {
        setSaleName('usd');
        setBuyName('usd');
        setQuantity('');
      };


    const buyHandler = async () => {       
      await buyCurrencyPost(dispatch, saleName, buyName, +quantity);
      walletGet(dispatch);
      cancelHandler();
      dispatch(showModal({ modalType: "" }));
    };

    const buyAllInHandler = async () => {       
        await buyAllInPost(dispatch, saleName, buyName);
        walletGet(dispatch);
        cancelHandler();
        dispatch(showModal({ modalType: "" }));
      };

  return (
    <div className={style.wrapper}>
        <div className={style.container}>
            <div className={style.buyCurrencyHeader}>
                Покупка и продажа
            </div>
            <div className={style.buyCurrencyContent}>
                <div className={style.saleContent}>
                    <label htmlFor="dropdown">За какую валюту купить: </label>
                    <select id="dropdown" value={saleName} onChange={handleSaleChange}>
                        {currencyNames.map((name) => {
                            return <option value={name}>{name}</option>
                        })}
                    </select>
                </div>
                <div className={style.buyContent}>
                    <label htmlFor="dropdown">Какую валюту купить: </label>
                    <select id="dropdown" value={buyName} onChange={handleBuyChange}>
                        {currencyNames.map((name) => {
                            return <option value={name}>{name}</option>
                        })}
                    </select>
                </div>
                <div className={style.quantityContent}>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={handleQuantityChange} 
                        placeholder="Введите колличество" 
                    />
                </div>
            </div>
            <div className={style.ButtonContainer}>
                <div className={style.ButtonBuyChoice}>
                    <Button
                        cb={buyHandler}
                        isActive={!isValidFormBuy}
                        size={ButtonSize.M}
                        theme={ButtonTheme.LIGTH}
                        title="Купить"
                    />
                    <Button
                        cb={cancelHandler}
                        isActive={true}
                        size={ButtonSize.M}
                        theme={ButtonTheme.LIGTH}
                        title="Отмена"
                    />
                </div>
                <div className={style.ButtonBuyAllIn}>
                    <Button
                    cb={buyAllInHandler}
                    isActive={!isValidFormBuyAllIn}
                    size={ButtonSize.M}
                    theme={ButtonTheme.LIGTH}
                    title="Купить на все"
                />
                </div>
            </div>
        </div>
    </div>
  )
};