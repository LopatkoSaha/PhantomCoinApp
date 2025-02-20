import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./PreorderStore.module.scss";
import { AppDispatch } from "app/store/store";
import { useAppSelector } from "app/store/useAppSelector";
import { preorderDelete } from "api/axios/preorderDelete";
import { preordersGet } from "api/axios/preordersGet";

export const PreorderStore = () => {
    const dispatch: AppDispatch = useDispatch();
    const preorders = useAppSelector((state) => state.preorders);
    const [showActivePreorders, setShowActivePreorder] = useState(true);

    const handlerChangeShowPreorders = () => setShowActivePreorder((prev) => !prev);
    const handlerDeletePreorder = async (id: number) => {
        await preorderDelete(dispatch, id);
        preordersGet(dispatch);
    };

    const isFilteredPreordrs = preorders.filter((item) => 
        showActivePreorders ? item.is_active === 1 : item.is_active === 2
    )

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                {showActivePreorders ? "Активные предзаказы" : "Неактивные предзаказы"}
            </div>
            <button 
                className={style.showPreorders}
                onClick={handlerChangeShowPreorders} 
            >
                {!showActivePreorders ? "Показать активные" : "Показать неактивные"}
            </button>
            <div className={style.content}>
                {isFilteredPreordrs.length === 0 
                ? "Данные отсутствуют" 
                : isFilteredPreordrs.map((item) => {
                    return (
                            <div className={style.card}>
                                {`- Купить ${item.is_all_in ? "на все": item.value_buy} ${item.currency_buy} за ${item.currency_sell} по курсу ${item.trigger_course} (создан ${item.created_at.split("T")[0]})`}
                                <button onClick={() => handlerDeletePreorder(item.id)}>Удалить</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}