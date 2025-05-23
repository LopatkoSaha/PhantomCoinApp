import { useState, useEffect } from "react";

import style from "./AdminGames.module.scss";
import { EditorDiscription } from "./EditorDiscription";

type TProps = {
    id: number;
    name: string;
    discription: string;
    handleDiscription: (id: number, name: string, discription: string) => void;
}

export const OneGameInfo = ({id, name, discription, handleDiscription}: TProps) => {
    const [isShowEditer, setIsShowEditer] = useState<boolean>(false);

    const changeDiscription = (text: string) => {
        handleDiscription(id, name, text);
    };
    
    const showEditor = () => {
        setIsShowEditer(false);
    }

    return(
        <div className={style.oneInfoWrapper}>
            <div className={style.oneInfoId}>id: {id}</div>
            <div className={style.oneInfoName}>Название: {name}</div>
            {!isShowEditer ?
                <>
                    <div className={style.oneInfoDiscription}>{discription}</div>
                    <button className={style.btnShowDiscription} onClick={() => setIsShowEditer(true)}>Изменить описание</button>
                </>
            : <EditorDiscription discription={discription} changeDiscription={changeDiscription} showEditer={showEditor}/>
            }
        </div>

    )
}