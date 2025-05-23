import { useState } from "react";

import style from "./AdminGames.module.scss";
import { TOption } from "./AllGameOptions";

type TProps = {
    props: TOption
    isUpdate: boolean;
    closeHandler: () => void;
    createHandler: (data: any) => void;
    updataHandler: (data: any) => void;
};

export const FormOptions = ({
    props,
    isUpdate,
    closeHandler,
    createHandler,
    updataHandler
}: TProps) => {

    let initGameConfig: Record<string, any> = {};
  if(props.game_config) {
    for (const key in JSON.parse(props.game_config)) {
      initGameConfig[key] = "";
    };
  };

    const [nameComplexity, setNameComplexity] = useState<string>(isUpdate ? props.name_complexity : "");
    const [bonusCoefficient, setBonusCoefficient] = useState<string>(isUpdate ? props.bonus_coefficient : "");
    const [discriptionComplexity, setDiscriptionComplexity] = useState<string>(isUpdate ? props.discription_complexity : "");
    const [sortOrder, setSortOrder] = useState<string>(isUpdate ? props.sort_order : "");
    const [gameConfig, setGameConfig] = useState<Record<string, any>>(isUpdate ? JSON.parse(props.game_config) : initGameConfig);

    const handleNameComplexityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameComplexity(e.target.value);
    };
    const handleBonusCoefficientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBonusCoefficient(e.target.value);
    };
    const handleDiscriptionComplexityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiscriptionComplexity(e.target.value);
    };
    const handleGortOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSortOrder(e.target.value);
    };

    const handleGameConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.dataset.key;
        const value = e.target.value;
      
        if (key) {
          setGameConfig((prev) => ({
            ...prev,
            [key]: Number(value),
          }));
        }
      };

    const requestData = {
        id: props.id,
        gameId: props.game_id,
        nameComplexity,
        bonusCoefficient,
        discriptionComplexity,
        sortOrder,
        gameConfig,
    };

    const isRequestData = Object.values(requestData).every(value => Boolean(value));

    const requestDataHandler = () => {
        if(isUpdate) updataHandler(requestData);
        if(!isUpdate) createHandler(requestData);
        closeHandler();
    };

    return (
        <div className={style.formBackground}>
            <div className={style.formWrapper}>
                <div className={style.formHeader}>Заполните форму</div>
                <div className={style.inputContainer} key="name_complexit">
                    <div className={style.inputTitle}>name_complexity:</div>
                    <input
                        data-key="name_complexity"
                        type="string"
                        value={nameComplexity}
                        onChange={handleNameComplexityChange}
                        placeholder="Введите значение"
                    />
                </div>
                <div className={style.inputContainer} key="bonus_coefficient">
                    <div className={style.inputTitle}>bonus_coefficient:</div>
                    <input
                        data-key="bonus_coefficient"
                        type="number"
                        min={1}
                        value={bonusCoefficient}
                        onChange={handleBonusCoefficientChange}
                        placeholder="Введите значение"
                    />
                </div>
                <div className={style.inputContainer} key="discription_complexity">
                    <div className={style.inputTitle}>discription_complexity:</div>
                    <textarea
                        data-key="discription_complexity"
                        value={discriptionComplexity}
                        onChange={handleDiscriptionComplexityChange}
                        placeholder="Введите значение"
                    />
                </div>
                <div className={style.inputContainer} key="sort_order">
                    <div className={style.inputTitle}>sort_order:</div>
                    <input
                        data-key="sort_order"
                        type="number"
                        value={sortOrder}
                        onChange={handleGortOrderChange}
                        placeholder="Введите значение"
                    />
                </div>
                {Object.entries(gameConfig).map(([key, value]) => {
                    return (
                        <div className={style.inputContainer} key={key}>
                            <div className={style.inputTitle}>{key}:</div>
                            <input
                                data-key={key}
                                type="number"
                                min={1}
                                value={value}
                                onChange={handleGameConfigChange}
                                placeholder="Введите значение"
                            />
                        </div>
                    )
                })}
            <div className={style.btnFormContainer}>
                <button onClick={requestDataHandler} disabled={!isRequestData}>Готово</button>
                <button onClick={closeHandler}>Отмена</button>
            </div>
            </div>
        </div>
    )
}