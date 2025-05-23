import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./Preorder.module.scss";
import { useAppSelector } from "app/store/useAppSelector";
import { AppDispatch } from "app/store/store";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { setPreorderPost } from "api/axios/setPreorderPost";
import { preordersGet } from "api/axios/preordersGet";

interface WalletState {
    [key: string]: number;
}

interface CoinIconsState {
    [key: string]: string;
}

export const Preorder = () => {
    const dispatch: AppDispatch = useDispatch();
    const wallet: WalletState = useAppSelector((state) => state.wallet);
    const user = useAppSelector((state) => state.user);
    const icons: CoinIconsState = useAppSelector((state) => state.coinIcons);

    const currencyNames = Object.keys(wallet).filter(
        (name) => name !== "id" && name !== "created_at"
    );

    const [saleName, setSaleName] = useState("usd");
    const [buyName, setBuyName] = useState("usd");
    const [quantity, setQuantity] = useState("");
    const [trigger, setTrigger] = useState("");
    const [isAllIn, setIsAllIn] = useState(false);

    const handleSaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSaleName(event.target.value);
    };
    const handleBuyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuyName(event.target.value);
    };
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value);
    };
    const handleIsAllInChange = () => {
        setIsAllIn(!isAllIn);
        if (!isAllIn) setQuantity("");
    };
    const handleTriggerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrigger(event.target.value);
    };

    const isValidFormPreorder = [saleName, buyName].some(
        (item) => (item === "") || (saleName === buyName)
    ) || (!isAllIn && quantity === "") || (trigger === "");

    const cancelHandler = () => {
        setSaleName("usd");
        setBuyName("usd");
        setQuantity("");
        setIsAllIn(false);
        setTrigger("");
    };

    const preorderHandler = async () => {
        await setPreorderPost(dispatch, saleName, buyName, isAllIn ? null : +quantity, isAllIn ? 1 : 0 , +trigger);
        preordersGet(dispatch);
        cancelHandler();
    };

    return (
        <div className={style.wrapper}>
            <div className={style.header}>Создать предзаказ</div>
            <div className={style.content}>
                <div className={style.saleContent}>
                    <label htmlFor="saleDropdown">За какую валюту купить: </label>
                    <select id="saleDropdown" value={saleName} onChange={handleSaleChange}>
                        {currencyNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={style.buyContent}>
                    <label htmlFor="buyDropdown">Какую валюту купить: </label>
                    <select id="buyDropdown" value={buyName} onChange={handleBuyChange}>
                        {currencyNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={style.quantityContent}>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        placeholder="Введите количество"
                        disabled={isAllIn}
                    />
                </div>
                <div className={style.triggerContent}>
                    <input
                        type="number"
                        value={trigger}
                        onChange={handleTriggerChange}
                        placeholder="Введите желаемый курс"
                    />
                </div>
                <div className={style.isAllInContent}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isAllIn}
                            onChange={handleIsAllInChange}
                        />
                        Купить на всё
                    </label>
                </div>
            </div>
            <div className={style.ButtonContainer}>
                <Button
                    cb={preorderHandler}
                    isActive={!isValidFormPreorder}
                    size={ButtonSize.M}
                    theme={ButtonTheme.LIGTH}
                    title="Создать"
                />
                <Button
                    cb={cancelHandler}
                    isActive={true}
                    size={ButtonSize.M}
                    theme={ButtonTheme.LIGTH}
                    title="Отмена"
                />
            </div>
        </div>
    );
};
