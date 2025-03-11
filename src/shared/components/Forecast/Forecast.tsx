import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./Forecast.module.scss"
import { useAppSelector } from "app/store/useAppSelector";
import { AppDispatch } from "app/store/store";
import { forecastPost } from "api/axios/forecastPost";
import { ForecastToken } from "api/axios/forecastToken";

interface WalletState {
    [key: string]: number;
  };
const intervalNames = ["7", "30", "183", "365"];

export const Forecast = () => {

    const dispatch: AppDispatch = useDispatch();
    const wallet: WalletState = useAppSelector((state) => state.wallet);
    const [forecastName, setForecastName] = useState('usd');
    const [forecastInterval, setForecastInterval] = useState("7");
    const [slowdowner, setSlowdowner] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [valueTokens, setValueTokens] = useState("");
    const [valueBuyTokens, setValueBuyTokens] = useState("1");

    const fetchDataTokens = async () => {
        const value = await ForecastToken.get(dispatch);
        setValueTokens(value);
    };

    useEffect(() => {
        fetchDataTokens();
    }, [])

    const currencyNames = Object.keys(wallet).filter(
        (name) => name !== "id" && name !== "created_at"
      );

    const handleForecastNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setForecastName(event.target.value);
    };
    const handleForecastIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setForecastInterval(event.target.value);
    };

    const delayedCharacters = (text: string): Promise<void> => {
        return new Promise((resolve) => {
            let index = 0;
            let displaySymbols = "";
            const generate = () => {
                setTimeout(() => {
                    if (index < text.length-1) {
                        displaySymbols += text[index];
                        setSlowdowner(displaySymbols);
                        index++;
                        generate();
                    }else {
                        resolve();
                    }
                }, 20)
            };
            generate();
        });
    };

    const handlForecast = async () => {
        setSlowdowner("Loading...");
        setIsActive(false);
        const forecastResult = await forecastPost(dispatch, forecastName, forecastInterval);
        await delayedCharacters(forecastResult);
        setIsActive(true);
        fetchDataTokens();
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueBuyTokens(event.target.value)
    };

    const handlBuyTokens = async () => {
        await ForecastToken.set(dispatch, +valueBuyTokens);
        fetchDataTokens();
        setValueBuyTokens("1");
    };
    

    return (
        <div className={style.wrapper}>
            <div className={style.tokenContainer}>
                <div className={style.info}>У Вас {valueTokens} токенов для прогноза</div>
                <div className={style.buyToken}>
                    <div className={style.header}>Купить токены:</div>
                    <input 
                        type="number"
                        min="1"
                        value={valueBuyTokens}
                        onChange={handleQuantityChange} 
                        placeholder="Введите колличество" 
                    />
                    <button className={style.btnBuyTokens} onClick={handlBuyTokens}>Купить</button>
                </div>
            </div>
            <div className={style.containerOptionsForecast}>
                <div className={style.forecastName}>
                    <label htmlFor="dropdown">Прогнозируемая валюта: </label>
                    <select id="dropdown" value={forecastName} onChange={handleForecastNameChange}>
                        {currencyNames.map((name) => {
                            return <option value={name} key={name}>{name}</option>
                        })}
                    </select>
                </div>
                <div className={style.forecastInterval}>
                    <label htmlFor="dropdown">Период прогноза: </label>
                    <select id="dropdown" value={forecastInterval} onChange={handleForecastIntervalChange}>
                        {intervalNames.map((name) => {
                            return <option value={name} key={name}>{name}</option>
                        })}
                    </select>
                </div>
                <button className={style.btnForecast} onClick={handlForecast} disabled={!isActive}>Получить прогноз</button>
            </div>
            <div className={style.containerShowForecast}>{slowdowner}</div>
            
        </div>
    )
}