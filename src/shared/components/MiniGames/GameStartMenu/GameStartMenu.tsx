import { useState } from "react";

import style from "./GameStartMenu.module.scss";
import { useAppSelector } from "app/store/useAppSelector";

type TProps = {
    gameData: {
        gameName: string;
        gameDiscription: string;
        options: {
            name: string;
            discription: string;
            bonusCoefficient: number;
        }[];
    };
    startHandler: (curr: string, bid: number, option: string) => void;
}


export const GameStartMenu = (props: TProps) => {
    const {gameData, startHandler} = props;
    
    const defaultComplexity = gameData.options?.[0]?.name ?? "easy";
    const [nameComplexity, setNameComplexity] = useState(defaultComplexity);
    const namesComplexitys = gameData.options.map((item) => item.name);
    const wallet = useAppSelector((state) => state.wallet);
    const namesCurrensys = Object.keys(wallet).filter((item) => item !== "id" && item !== "created_at");
    const [bidCurrency, setBidCurrency] = useState(namesCurrensys[0]);
    const [bid, setBid] = useState("");
    const currentOption = gameData.options.find((item) => item.name === nameComplexity);
    const icons = useAppSelector((state) => state.coinIcons);

    const handleChangeComplexity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNameComplexity(event.target.value);
      };

    const handleBidCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBidCurrency(event.target.value);
    };

    const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBid(event.target.value);
    };

    const handleStartGame = () => {
        if (!+bid) return;
        startHandler(nameComplexity, +bid, bidCurrency);
    }
 
    return (
        <div className={style.wrapper}>
            <div className={style.header}>{gameData.gameName.toUpperCase()}</div>
            <div className={style.discriptionGame}>{gameData.gameDiscription}</div>
            <div className={style.container}>
                <div className={style.complexity}>
                    <label htmlFor="buyDropdown">Выберите сложность: </label>
                    <select id="buyDropdown" value={nameComplexity} onChange={handleChangeComplexity}>
                        {namesComplexitys.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={style.currency}>
                    <label htmlFor="buyDropdown">Выберите валюту ставки: </label>
                    <select id="buyDropdown" value={bidCurrency} onChange={handleBidCurrencyChange}>
                        {namesCurrensys.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={style.bid}>
                    <input
                        type="number"
                        value={bid}
                        onChange={handleBidChange}
                        placeholder="Величина ставки"
                    />
                </div>
            </div>
            {currentOption && (
                <div className={style.discriptionConplexity}>
                    {currentOption.discription}
                    В случае победы Ваша ставка умножается на {currentOption.bonusCoefficient}.
                </div>
            )}
            <div className={style.btnContainer}>
                <button 
                    className={style.btnStart} 
                    onClick={handleStartGame}
                >
                    Старт
                </button>
            </div>
        </div>
    )
}