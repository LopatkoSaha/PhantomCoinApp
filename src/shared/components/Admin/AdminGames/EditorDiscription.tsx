import { useState } from "react";

import style from "./AdminGames.module.scss";

type TProps = {
    discription: string;
    changeDiscription: (text: string) => void;
    showEditer: () => void;
}

export const EditorDiscription = ({ discription, changeDiscription, showEditer}: TProps) => {
    const [newDiscription, setNewDiscription] = useState<string>(discription);

    const handleTriggerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDiscription(e.target.value);
      };
    
    const validator = discription === newDiscription;
    const handleChange = () => {
        changeDiscription(newDiscription);
        showEditer();
    };

    return(
        <div className={style.editerWrapper}>
            <textarea
                value={newDiscription}
                onChange={handleTriggerChange}
                placeholder="Введите описание"
            />
            <div className={style.btnContainer}>
                <button onClick={handleChange} disabled={validator}>Применить</button>
                <button onClick={showEditer}>Отмена</button>
            </div>
        </div>
    )
}