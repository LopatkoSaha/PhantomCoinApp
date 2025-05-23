import style from "./AdminGames.module.scss";
import { TOption } from "./AllGameOptions";

type TProps = TOption & {
    idx: number;
    deleteRequestHandler: (id: number) => void;
    updateHandler: (index: number) => void;
};

export const OneOption = ({
    idx,
    id, 
    game_id, 
    name_complexity, 
    bonus_coefficient, 
    discription_complexity, 
    sort_order, 
    game_config,
    deleteRequestHandler,
    updateHandler
}: TProps) => {

    return (
        <div className={style.optionContainer}>
            <div className={style.optionName}>name_complexity: {name_complexity}</div>
            <div className={style.optionBonus}>bonus_coefficient: {bonus_coefficient}</div>
            <div className={style.optionDiscription}>discription_complexity: {discription_complexity.length > 10 ? discription_complexity.slice(0, 20) + '...' : discription_complexity}</div>
            <div className={style.optionSortOrder}>sort_order: {sort_order}</div>
            <div className={style.btnContainer}>
                <button onClick={()=>{updateHandler(idx)}}>Изменить</button>
                <button onClick={()=>deleteRequestHandler(id)}>Удалить</button>
            </div>
        </div>
    )
}