import { useState } from "react";

import style from "./AdminWallets.module.scss";


type TProps = {
    props: Record<string, any> | null;
    closeHandler: () => void;
    updataHandler: (data: any) => void;
};

export const FormWallet = ({
    props,
    closeHandler,
    updataHandler
}: TProps) => {

    let dataWallet: Record<string, any> = {};
    for (const key in props) {
        if(key === "id" || key === "userId" || key === "name" || key === "email" || key === "created_at" || key === "cost") continue;
        dataWallet[key] = +props[key];
    };

    const [wallet, setWallet] = useState<Record<string, any>>(dataWallet);

    const handleGameConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.dataset.key;
        const value = e.target.value;
      
        if (key) {
            setWallet((prev) => ({
            ...prev,
            [key]: Number(value),
          }));
        }
      };

    const requestDataHandler = () => {
        updataHandler(wallet);
        closeHandler();
    };

    return (
        <div className={style.formBackground}>
            <div className={style.formWrapper}>
            <div className={style.header}>{props?.name}</div>
                {Object.entries(wallet).map(([key, value]) => {
                    return (
                        <div className={style.inputContainer} key={key}>
                            <div className={style.inputTitle}>{key}:</div>
                            <input
                                data-key={key}
                                type="number"
                                min={0}
                                value={value}
                                onChange={handleGameConfigChange}
                                placeholder="Введите значение"
                            />
                        </div>
                    )
                })}
            <div className={style.btnFormContainer}>
                <button onClick={requestDataHandler}>Готово</button>
                <button onClick={closeHandler}>Отмена</button>
            </div>
            </div>
        </div>
    )
}