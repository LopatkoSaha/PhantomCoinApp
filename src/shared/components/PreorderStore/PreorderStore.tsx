import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./PreorderStore.module.scss";
import { AppDispatch } from "app/store/store";
import { useAppSelector } from "app/store/useAppSelector";
import { preorderDelete } from "api/axios/preorderDelete";
import { preordersGet } from "api/axios/preordersGet";

interface CoinIconsState {
    [key: string]: string;
  }
const optionShow = ["Активные", "Не активные", "Все"];

export const PreorderStore = () => {
    const dispatch: AppDispatch = useDispatch();
    const icons: CoinIconsState = useAppSelector((state) => state.coinIcons);
    const courses = useAppSelector((state) => state.courses);
    const preorders = useAppSelector((state) => state.preorders);
    const [condinionShow, setConditionShow] = useState(optionShow[0]);

     useEffect(() => {
        preordersGet(dispatch);
      }, [courses]);

    const handleShowPreorders = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setConditionShow(event.target.value)
    };

    const handlerDeletePreorder = async (id: number) => {
        await preorderDelete(dispatch, id);
        preordersGet(dispatch);
    };

    const isFilteredPreordrs = preorders.filter((item) => {
        if(condinionShow === "Активные") return item.is_active === 1;
        if(condinionShow === "Не активные") return item.is_active === 0;
        if(condinionShow === "Все") return item;
    })

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                {`${condinionShow} предзаказы`}
            </div>
            <div className={style.optsions}>
                    <label htmlFor="dropdown">Показать: </label>
                    <select id="dropdown" value={condinionShow} onChange={handleShowPreorders}>
                        {optionShow.map((name) => {
                            return <option value={name} key={name}>{name}</option>
                        })}
                    </select>
                </div>
            <div className={style.content}>
                {isFilteredPreordrs.length === 0 
                ? "Данные отсутствуют" 
                : isFilteredPreordrs.map((item) => {
                    return (
                            <div className={style.card}>
                                {`- Купить ${item.is_all_in ? "на все": item.value_buy} 
                                    ${item.currency_buy} за ${item.currency_sell} 
                                    по курсу ${item.trigger_course} 
                                    (создан ${item.created_at.split("T")[0]})
                                    ${item.is_active === 1 ? "активный" : "не активный"}
                                `}
                                <button onClick={() => handlerDeletePreorder(item.id)}>Удалить</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}